@isTest
public class updateNumberOfMoviesTest {
  @isTest
  public static void testUpdateNumberOfMoviesTest_for_one_actor_one_movie() {
    //Given
    String movieId = TestDataFactory.createMovie('Solo leveling');
    String actorId = TestDataFactory.createActor('Oualid Slaaoutier');

    //When
    Test.startTest();
    MovieActor__c movieActor = new MovieActor__c(
      Actor__c = actorId,
      Movie__c = movieId
    );
    insert movieActor;
    Test.stopTest();

    //Then
    Actor__c actor = [
      SELECT Name, Number_of_movies__c
      FROM Actor__c
      WHERE Id = :actorId
    ];
    System.assertEquals(actor.Number_of_movies__c, 1);
  }
  @isTest
  public static void testUpdateNumberOfMoviesTest_for_one_actor_many_movies() {
    //Given
    String soloLevelingId = TestDataFactory.createMovie('Solo leveling');
    String titanicId = TestDataFactory.createMovie('Titanic');
    String actorId = TestDataFactory.createActor('Oualid Slaaoutier');

    //When
    Test.startTest();
    List<MovieActor__c> moviesActors = new List<MovieActor__c>();

    MovieActor__c movieActor1 = new MovieActor__c(
      Actor__c = actorId,
      Movie__c = soloLevelingId
    );
    MovieActor__c movieActor2 = new MovieActor__c(
      Actor__c = actorId,
      Movie__c = titanicId
    );

    moviesActors.add(movieActor1);
    moviesActors.add(movieActor2);

    insert moviesActors;
    Test.stopTest();

    //Then
    Actor__c actor = [
      SELECT Name, Number_of_movies__c
      FROM Actor__c
      WHERE Id = :actorId
    ];
    System.assertEquals(actor.Number_of_movies__c, 2);
  }

  @isTest
  public static void testUpdateNumberOfMoviesTest_for_many_actors_many_movies() {
    //Given
    String soloLevelingId = TestDataFactory.createMovie('Solo leveling');
    String titanicId = TestDataFactory.createMovie('Titanic');
    String inceptionId = TestDataFactory.createMovie('Inception');
    String oualidId = TestDataFactory.createActor('Oualid Slaaoutier');
    String ahmedId = TestDataFactory.createActor('Ahmed');
    String najlaeId = TestDataFactory.createActor('Najlae');

    //When
    Test.startTest();
    List<MovieActor__c> moviesActors = new List<MovieActor__c>();

    MovieActor__c oualidSoloLeveling = new MovieActor__c(
      Actor__c = oualidId,
      Movie__c = soloLevelingId
    );
    MovieActor__c ahmedSoloLeveling = new MovieActor__c(
      Actor__c = ahmedId,
      Movie__c = soloLevelingId
    );
    MovieActor__c oualidTitanic = new MovieActor__c(
      Actor__c = oualidId,
      Movie__c = titanicId
    );
    MovieActor__c oualidInception = new MovieActor__c(
      Actor__c = oualidId,
      Movie__c = inceptionId
    );
    MovieActor__c ahmedInception = new MovieActor__c(
      Actor__c = ahmedId,
      Movie__c = inceptionId
    );
    MovieActor__c najlaeInception = new MovieActor__c(
      Actor__c = najlaeId,
      Movie__c = inceptionId
    );

    moviesActors.add(oualidSoloLeveling);
    moviesActors.add(oualidTitanic);
    moviesActors.add(oualidInception);

    moviesActors.add(ahmedSoloLeveling);
    moviesActors.add(ahmedInception);

    moviesActors.add(najlaeInception);

    insert moviesActors;
    Test.stopTest();

    //Then
    Actor__c oualid = [
      SELECT Name, Number_of_movies__c
      FROM Actor__c
      WHERE Id = :oualidId
    ];
    Actor__c ahmed = [
      SELECT Name, Number_of_movies__c
      FROM Actor__c
      WHERE Id = :ahmedId
    ];
    Actor__c najlae = [
      SELECT Name, Number_of_movies__c
      FROM Actor__c
      WHERE Id = :najlaeId
    ];
    System.assertEquals(oualid.Number_of_movies__c, 3);
    System.assertEquals(ahmed.Number_of_movies__c, 2);
    System.assertEquals(najlae.Number_of_movies__c, 1);
  }
}
