// allJobs
Meteor.publish("allJobForms", function(jobId) {
  return JobForm.find({jobId: jobId, deleted: false});
});
