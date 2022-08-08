trigger updateNumberOfMovies on MovieActor__c(after insert) {
  List<Actor__c> actors = new List<Actor__c>();
  Set<String> idsActors = new Set<String>();
  Map<String, Integer> idActorToOccurence = new Map<String, Integer>();
  for (MovieActor__c movieActor : Trigger.new) {
    String idActor = movieActor.Actor__c;
    idsActors.add(idActor);
    if (idActorToOccurence.containsKey(idActor)) {
      Integer occurence = idActorToOccurence.get(idActor);
      idActorToOccurence.put(idActor, ++occurence);
    } else {
      idActorToOccurence.put(idActor, 1);
    }
  }
  for (Actor__c actor : [
    SELECT ID, Name, Number_of_movies__c
    FROM Actor__c
    WHERE Id IN :idsActors
  ]) {
    actor.Number_of_movies__c = actor.Number_of_movies__c != null
      ? ((++actor.Number_of_movies__c) * idActorToOccurence.get(actor.Id))
      : (idActorToOccurence.get(actor.Id));
    actors.add(actor);
  }
  if (actors.size() > 0) {
    update actors;
  }
  //TODO :need also to decrease number of movies on delete 
}
