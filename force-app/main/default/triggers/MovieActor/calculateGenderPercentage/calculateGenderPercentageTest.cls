@isTest
private with sharing class calculateGenderPercentageTest {
  @isTest
  public static void only_female_actors() {
    //Given
    String najlaeId = TestDataFactory.createActor('Najlae', 'Female');
    String salmaId = TestDataFactory.createActor('Salma', 'Female');

    String idWonderWoman = TestDataFactory.createMovie('Wonder Woman');

    //When
    Test.startTest();
    List<MovieActor__c> moviesActors = new List<MovieActor__c>();

    MovieActor__c salmaWonderWoman = new MovieActor__c(
      Actor__c = salmaId,
      Movie__c = idWonderWoman
    );
    MovieActor__c najlaeWonderWoman = new MovieActor__c(
      Actor__c = najlaeId,
      Movie__c = idWonderWoman
    );
    moviesActors.add(salmaWonderWoman);
    moviesActors.add(najlaeWonderWoman);
    
    insert moviesActors;
    Test.stopTest();

    //Then
    Movie__c movie = [Select MaleActorsPercentage__c	,FemaleActorsPercentage__c from Movie__c where Id = :idWonderWoman];
    System.assertEquals(movie.MaleActorsPercentage__c, 0);
    System.assertEquals(movie.FemaleActorsPercentage__c, 100);
  }

  @isTest
  public static void female_and_male_actors() {
    //Given
    String najlaeId = TestDataFactory.createActor('Najlae', 'Female');
    String salmaId = TestDataFactory.createActor('Salma', 'Female');
    String oualidId = TestDataFactory.createActor('Oualid', 'Male');

    String idInception = TestDataFactory.createMovie('Inception');

    //When
    Test.startTest();
    List<MovieActor__c> moviesActors = new List<MovieActor__c>();

    MovieActor__c salmaInception = new MovieActor__c(
      Actor__c = salmaId,
      Movie__c = idInception
    );
    MovieActor__c najlaeInception = new MovieActor__c(
      Actor__c = najlaeId,
      Movie__c = idInception
    );
    MovieActor__c oualidInception = new MovieActor__c(
      Actor__c = oualidId,
      Movie__c = idInception
    );
    moviesActors.add(salmaInception);
    moviesActors.add(najlaeInception);
    moviesActors.add(oualidInception);
    
    insert moviesActors;
    Test.stopTest();

    //Then
    Movie__c movie = [Select MaleActorsPercentage__c	,FemaleActorsPercentage__c from Movie__c where Id = :idInception];
    System.assertEquals(movie.MaleActorsPercentage__c, 33);
    System.assertEquals(movie.FemaleActorsPercentage__c, 66);
  }
}
