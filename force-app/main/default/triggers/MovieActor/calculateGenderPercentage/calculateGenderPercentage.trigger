trigger calculateGenderPercentage on MovieActor__c(after insert) {
  List<Movie__c> movies = new List<Movie__c>();
  Set<String> moviesIds = new Set<String>();

  for(MovieActor__c movieActor : trigger.new){
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
    //When the movie is updated , the percentage need to change. I didn't implement the modification feature yet.
  }
  update movies;
}
