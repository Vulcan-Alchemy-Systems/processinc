// allProcess
Meteor.publish("allProcess", function() {
  return Process.find({deleted: false});
});

// allJobProcess
Meteor.publish("allJobProcess", function(jobId) {
  return Process.find({jobId: jobId});
});
