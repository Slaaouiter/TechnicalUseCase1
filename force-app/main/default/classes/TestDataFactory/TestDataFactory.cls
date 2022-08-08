@isTest
public with sharing class TestDataFactory {
  public static String createActor(String name) {
    Actor__c actor = new Actor__c();
    actor.Name = name;
    insert actor;
    return actor.Id;
  }

  public static String createContentVersion(String title, String pathOnClient) {
    ContentVersion contentVersion = new ContentVersion(
      Title = title,
      PathOnClient = pathOnClient,
      VersionData = Blob.valueOf('random text'),
      origin = 'H'
    );
    insert contentVersion;
    return contentVersion.Id;
  }

  public static String createMovie(String name) {
    Movie__c movie = new Movie__c(Name = name);
    insert movie;
    return movie.Id;
  }
}
