global with sharing class ScheduleUpdateMovieBatch implements Schedulable {
  global void execute(SchedulableContext sc) {
    UpdateMovieBatch updateMovieBatch = new UpdateMovieBatch();
    database.executebatch(updateMovieBatch);
  }
}
