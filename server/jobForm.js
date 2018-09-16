// allJobForms
Meteor.publish("allJobForms", function(jobId) {
  return JobForm.find({jobId: jobId, deleted: false});
});

// allJobForms
Meteor.publish("singleJobForm", function(jobFormId) {
  return JobForm.find({_id: jobFormId});
});
