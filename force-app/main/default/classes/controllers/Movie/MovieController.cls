public with sharing class MovieController {
  @AuraEnabled
  public static void createMovie(
    Movie__c movie,
    List<String> actorsIds,
    String contentDocumentId
  ) {
    String userId = UserInfo.getUserId();

    if (movie != null) {
      insert movie;
      List<MovieActor__c> moviesActors = new List<MovieActor__c>();
      for (String actorId : actorsIds) {
        MovieActor__c movieActor = new MovieActor__c(
          Actor__c = actorId,
          Movie__c = movie.Id
        );
        moviesActors.add(movieActor);
      }
      if (!moviesActors.isEmpty()) {
        insert moviesActors;
      }
      
      FileManagementService.changeContentDocumentLinkedEntity(
        contentDocumentId,
        userId,
        movie.Id
      );
      // ContentVersion contentVersion = [
      //   SELECT Id
      //   FROM ContentVersion
      //   WHERE ContentDocumentId = :contentDocumentId
      // ];

      // movie.Picture__c = contentVersion.Id;
    }
  }

  @AuraEnabled( cacheable = true )
  public static List<Movie__c> getMovies(String movieSearchName){
    String searchCriterie = '%'+movieSearchName+'%';
    List<Movie__c> movies = [SELECT NAME, TYPE__C, RATING__C, PICTURE__C FROM Movie__c WHERE NAME LIKE :searchCriterie];
    System.debug(movies);
    return movies;
  }
}
