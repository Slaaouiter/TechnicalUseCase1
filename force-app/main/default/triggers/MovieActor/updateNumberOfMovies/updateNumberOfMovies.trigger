trigger updateNumberOfMovies on MovieActor__c(after insert, after delete) {
  if (Trigger.isInsert) {
    MovieActorHelper.updateNumberOfMovies(Trigger.new);
  } else if (Trigger.isDelete) {
    //TODO :need also to decrease number of movies on delete
  }
}
