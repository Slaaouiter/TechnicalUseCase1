public with sharing class MovieActorHelper {
    public static void updateNumberOfMovies(List<MovieActor__c> moviesActors){
        List<Actor__c> actors = new List<Actor__c>();
        Set<String> idsActors = new Set<String>();
        Map<String, Integer> idActorToOccurence = new Map<String, Integer>();
        for (MovieActor__c movieActor : moviesActors) {
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
    }

    public static void calculateGenderPercentage(List<MovieActor__c> moviesActors){
        List<Movie__c> movies = new List<Movie__c>();
        Set<String> moviesIds = new Set<String>();
      
        for(MovieActor__c movieActor : moviesActors){
          moviesIds.add(movieActor.Movie__c);
        }
      
        for (Movie__c movie : [Select Id from Movie__c where Id in :moviesIds]) {
          Integer numberOfMaleActors = 0;
          Integer numberOfFemaleActors = 0;
          for (AggregateResult aggregateResult : [
            SELECT Actor__r.Gender__c gender, Count(Actor__c) numberOfActorPerGender
            FROM MovieActor__c
            WHERE Movie__c = :movie.Id
            GROUP BY Actor__r.Gender__c
          ]) {
            if ('Male'.equals((String) aggregateResult.get('gender'))) {
              numberOfMaleActors = (Integer) aggregateResult.get(
                'numberOfActorPerGender'
              );
            } else if ('Female'.equals((String) aggregateResult.get('gender'))) {
              numberOfFemaleActors = (Integer) aggregateResult.get(
                'numberOfActorPerGender'
              );
            }
          }
          Integer numberOfActors = numberOfFemaleActors + numberOfMaleActors;
          movie.MaleActorsPercentage__c = numberOfActors > 0
            ? ((numberOfMaleActors * 100) / numberOfActors)
            : 0;
          movie.FemaleActorsPercentage__c = numberOfActors > 0
            ? ((numberOfFemaleActors * 100) / numberOfActors)
            : 0;
          movies.add(movie);
        }
        update movies;
    }
}
