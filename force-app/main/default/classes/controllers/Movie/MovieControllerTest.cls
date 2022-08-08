@isTest
private with sharing class MovieControllerTest {
  @isTest
  static void createMovie_createsMovie_and_relate_it_with_actors() {
    //Given
    Movie__c movie = new Movie__c(
      Name = 'The Hunter',
      Rating__c = 4,
      Description__c = 'Be the hunter or be the prey',
      Type__c = 'Horror',
      Picture__c = 'A00001'
    );

    String contentVersionId = TestDataFactory.createContentVersion(
      'Hunter picture',
      'Hunter.jpg'
    );
    ContentVersion contentVersion = [
      SELECT Id, contentDocumentId
      FROM ContentVersion
      WHERE Id = :contentVersionId
    ];
    String contentDocumentId = contentVersion.ContentDocumentId;

    String idAhmed = TestDataFactory.createActor('Ahmed','Male');
    String idOualid = TestDataFactory.createActor('Oualid','Male');
    List<String> actorsIds = new List<String>{ idAhmed, idOualid };
    //When
    Test.startTest();
    MovieController.createMovie(movie, actorsIds, contentDocumentId);
    Test.stopTest();
    //Then
    Movie__c movieCreated = [
      SELECT Name, Rating__c, Description__c, Type__c, Picture__c
      FROM Movie__c
      WHERE Name = 'The Hunter'
    ];
    System.assert(movieCreated != null);
    System.assertEquals(movieCreated.Name, movie.Name);
    System.assertEquals(movieCreated.Rating__c, movie.Rating__c);
    System.assertEquals(movieCreated.Description__c, movie.Description__c);
    System.assertEquals(movieCreated.Type__c, movie.Type__c);
    System.assertEquals(movieCreated.Picture__c, movie.Picture__c);
    List<MovieActor__c> moviesActors = [
      SELECT Name, Movie__c, Actor__c
      FROM MovieActor__c
    ];
    System.assert(moviesActors.size() == 2);
  }
}
