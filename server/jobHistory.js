// allJobHistory
Meteor.publish("allJobHistory", function(jobId) {
  return JobHistory.find({jobId: jobId, deleted: false});
});

// userJobHistory
Meteor.publish("userJobHistory", function(userId) {
  return JobHistory.find({createdBy: userId, deleted: false});
});
