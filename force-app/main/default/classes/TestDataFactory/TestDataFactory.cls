@isTest
public with sharing class TestDataFactory {
  public static String createActor(String Name) {
    Actor__c actor = new Actor__c();
    actor.Name = Name;
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

  public static String createMovie(String name, String picture) {
    Movie__c movie = new Movie__c(Name = name, Picture__c = picture);
    insert movie;
    return movie.Id;
  }
}
