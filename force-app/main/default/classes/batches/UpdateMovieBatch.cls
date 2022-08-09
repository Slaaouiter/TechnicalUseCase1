public class UpdateMovieBatch implements Database.Batchable<SObject> {

    public Database.QueryLocator start(
    Database.BatchableContext batchableContext
  ) {
    //Why not use formula field ?
    return Database.getQueryLocator(
      [
        SELECT Release_date__c, IsReleased__c
        FROM Movie__c
        WHERE (IsReleased__c = FALSE OR IsReleased__c = NULL) AND Release_date__c < TODAY 
      ]
    );
  }
  public void execute(
    Database.BatchableContext batchableContext,
    List<Movie__c> movies
  ) {
    for (Movie__c movie : movies) {
        movie.IsReleased__c = true;
    }
    update movies;
  }

  public void finish(Database.BatchableContext batchableContext) {
  }
}
