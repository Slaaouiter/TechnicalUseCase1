@isTest
public with sharing class ActorsControllerTest {
    @TestSetup
    static void initializeData(){
        TestDataFactory.createActor('Ahmed','Male');
    }

    @isTest
    static void test(){
        //When
        Test.startTest();
        List<Actor__c> actors = ActorsController.getActors();
        Test.stopTest();
        //Then
        System.assert(!actors.isEmpty() && actors.size() == 1);

        Actor__c actor = actors.get(0);
        System.assertEquals(actor.Name, 'Ahmed');
    }
}
