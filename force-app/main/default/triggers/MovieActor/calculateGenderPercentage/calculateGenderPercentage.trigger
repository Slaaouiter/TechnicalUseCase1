trigger calculateGenderPercentage on MovieActor__c(after insert) {
  if (Trigger.isInsert) {
    MovieActorHelper.calculateGenderPercentage(trigger.new);
  } else if (Trigger.isUpdate) {
    //When the movie is updated , the percentage need to change. I didn't implement the modification feature yet.
  }
}
