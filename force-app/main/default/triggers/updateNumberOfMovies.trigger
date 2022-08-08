trigger updateNumberOfMovies on MovieActor__c (after insert) {
    // String idActor = trigger.new.Actor__c;
    // Actor__c actor = [SELECT ID,Name, Number_of_movies__c from Actor__c where Id =:idActor];
    // actor.Number_of_movies__c =  actor.Number_of_movies__c ++;
    // update actor;
}