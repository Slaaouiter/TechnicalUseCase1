@isTest
public with sharing class ScheduleUpdateMovieBatchTest {
  public static String CRON_EXP = '0 0 0 3 9 ? 2032'; // September the third 2032

  @isTest
  static void scheduleUpdateMovieBatch() {
    Test.startTest();
    String jobId = System.schedule(
      'ScheduleUpdateMovieBatch',
      CRON_EXP,
      new ScheduleUpdateMovieBatch()
    );
    Test.stopTest();
    CronTrigger cronTrigger = [
      SELECT TimesTriggered, NextFireTime, CronJobDetail.Name
      FROM CronTrigger
      WHERE Id = :jobID
    ];
    System.assertEquals(
      cronTrigger.CronJobDetail.Name,
      'ScheduleUpdateMovieBatch',
      'The batch was not scheduled'
    );
  }
}
