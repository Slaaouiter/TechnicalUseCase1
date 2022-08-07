public with sharing class MovieService {
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
}
