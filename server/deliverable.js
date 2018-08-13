// allDeliverable
Meteor.publish("allDeliverable", function() {
  return Deliverable.find({deleted: false});
});

// allJobDeliverable
Meteor.publish("allJobDeliverable", function(jobId) {
  return Deliverable.find({jobId: jobId});
});
