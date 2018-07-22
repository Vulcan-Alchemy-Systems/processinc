// allJobs
Meteor.publish("allJobs", function() {
  return Job.find({deleted: false});
});

// singleJob
Meteor.publish("singleJob", function(id) {
  return Job.find({_id: id});
});

// userJobs
Meteor.publish("userJobs", function(userId) {
  return Job.find({userId: userId, deleted: false});
});
