// allProcess
Meteor.publish("allExtractionProcess", function() {
  return ExtractionProcess.find({deleted: false});
});

// allJobProcess
Meteor.publish("allJobExtractionProcess", function(jobId) {
  return ExtractionProcess.find({jobId: jobId});
});
