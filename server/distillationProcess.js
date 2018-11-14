// allProcess
Meteor.publish("allDistillationProcess", function() {
  return DistillationProcess.find({deleted: false});
});

// allJobProcess
Meteor.publish("allJobDistillationProcess", function(jobId) {
  return DistillationProcess.find({jobId: jobId});
});
