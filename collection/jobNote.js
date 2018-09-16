import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

JobNote = new Meteor.Collection("jobNote");

JobNote.allow({
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

JobNoteSchema = new SimpleSchema({
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },
  note: {
    type: String,
    label: "Note",
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

JobNote.attachSchema(JobNoteSchema);

Meteor.methods({
  createJobNote: function(jobId, note) {
    var object = {
      jobId: jobId,
      note: note,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      note: String,
    });

    console.log(object);

    var result = JobNote.insert(object);

    return result;
  },
  updateJobNote: function(id, jobId, note) {
    var object = {
      jobId: jobId,
      note: note,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      note: String,
    });

    var result = JobNote.update(id, {$set: object});

    return result;
  },
  deleteJobNote: function(id) {
    var result = JobNote.update(id, {$set: {
      deleted: true
    }});

    return result;
  }
});
