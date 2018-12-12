// allDeliverable
Meteor.publish("allDeliverable", function() {
  return Deliverable.find({deleted: false});
});

Meteor.publish("singleDeliverable", function(id) {
  return Deliverable.find({_id: id});
});


// allJobDeliverable
Meteor.publish("allJobDeliverable", function(jobId) {
  return Deliverable.find({jobId: jobId});
});
