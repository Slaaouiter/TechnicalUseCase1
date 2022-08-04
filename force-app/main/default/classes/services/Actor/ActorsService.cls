public with sharing class ActorsService {
    @AuraEnabled(cacheable=true)
    public static List<Actor__c> getActors(){
        return [SELECT ID, NAME FROM Actor__c];
    }
}
