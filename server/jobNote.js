// allJobHistory
Meteor.publish("allJobNotes", function(jobId) {
  return JobNote.find({});
});
