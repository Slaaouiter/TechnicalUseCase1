@isTest
public with sharing class TestDataFactory {
    public static void createActor(String Name){
        Actor__c actor = new Actor__c();
        actor.Name = Name;
        insert actor;
    }
}
