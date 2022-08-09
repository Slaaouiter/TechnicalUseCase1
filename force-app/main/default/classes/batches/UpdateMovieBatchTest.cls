@isTest
public with sharing class UpdateMovieBatchTest {
    @TestSetup
    static void initData() {
      TestDataFactory.createMovie('The hunter Season 2', Date.today().addDays(3));
      TestDataFactory.createMovie('The hunter Season 1', Date.newInstance(2022, 8, 8));
    }
  
    @isTest
    static void updateIsReleasedField() {
      //When
      Test.startTest();
      UpdateMovieBatch batch = new UpdateMovieBatch();
      Id batchId = Database.executeBatch(batch);
      Test.stopTest();
      //Then
      Movie__c movie = [SELECT Name FROM Movie__c WHERE IsReleased__c = TRUE];
      System.assertEquals(
        movie.Name,
        'The hunter Season 1',
        'The movie that should be released is The hunter Season 1'
      );
    }
}
