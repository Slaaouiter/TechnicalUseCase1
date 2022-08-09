@isTest
public with sharing class TestDataFactory {
  public static String createActor(String name, String gender) {
    Actor__c actor = new Actor__c();
    actor.Name = name;
    actor.Gender__c = gender;
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
  public static String createMovie(String name, Date releasedDate) {
    Movie__c movie = new Movie__c(Name = name, Release_date__c = releasedDate);
    insert movie;
    return movie.Id;
  }

  public static String createMovieActor(String movieId, String actorId) {
    MovieActor__c movieActor = new MovieActor__c(
      Actor__c = actorId,
      Movie__c = movieId
    );
    insert movieActor;
    return movieActor.Id;
  }
}
