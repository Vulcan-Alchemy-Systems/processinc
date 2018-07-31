import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

JobHistory = new Meteor.Collection("jobHistory");

JobHistory.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

JobHistorySchema = new SimpleSchema({
  jobId: {
    type: String,
    label: "Job Id",
    optional: false,
  },
  message: {
    type: String,
    label: "Message",
    optional: false,
  },
  deleted: {
    type: Boolean,
    label: "Deleted",
    optional: false,
  },
  created: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    }
  },
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});

JobHistory.attachSchema(JobHistorySchema);

Meteor.methods({
  createJobHistory: function(jobId, message) {
    var object = {
      jobId: jobId,
      message: message,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      jobId: String,
      message: String,
      deleted: Boolean
    });

    console.log(isSafeToProcess);

    if(isSafeToProcess) {
      var result = JobHistory.insert(object);
      return result;
    } else {
      throw new Meteor.Error('Failed to save job history');
    }
  },
  updateJobHistory: function(id, jobId, message) {

  },
  deleteJobHistory: function(id) {

  }
});
