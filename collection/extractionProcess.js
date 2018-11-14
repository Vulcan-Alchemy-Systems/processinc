import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

ExtractionProcess = new Meteor.Collection("extractionProcess");

ExtractionProcess.allow({
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


extractionProcessSchema = new SimpleSchema({
  // jobId
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },

  // date
  date: {
    type: Date,
    label: "Date",
    optional: false,
  },

  // shift
  shift: {
    type: String,
    label: "Shift",
    optional: false,
  },

  // userId
  userId: {
    type: String,
    label: "User",
    optional: false,
  },

  // postBlast
  postBlast: {
    type: Number,
    label: "Post Blast",
    optional: false,
  },

  // crude
  crude: {
    type: Number,
    label: "Crude",
    optional: false,
  },

  // yield
  extractionYield: {
    type: Number,
    label: "Yield",
    optional: false,
  },

  machine: {
    type: String,
    label: "machine",
    optional: false,
  },

  // note
  note: {
    type: String,
    label: "Note",
    optional: true,
  },

  // deleted
  deleted: {
    type: Boolean,
    label: "Deleted",
    optional: false,
  },

  // created
  created: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    }
  },

  // createdBy
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});

ExtractionProcess.attachSchema(extractionProcessSchema);

Meteor.methods({
  createProcessExtraction: function(jobId, date, shift, userId, postBlast, crude, extractionYield, machine, note) {
    var object = {
      jobId: jobId,
      date: date,
      shift: shift,
      userId: userId,
      postBlast: postBlast,
      crude: crude,
      extractionYield: extractionYield,
      machine: machine,
      note: note,
      deleted: false
    }

    var result = ExtractionProcess.insert(object);

    return result;
  },
  updateProcessExtraction: function(id, jobId, date, shift, userId, postBlast, crude, extractionYield, machine, note) {
    var object = {
      jobId: jobId,
      date: date,
      shift: shift,
      userId: userId,
      postBlast: postBlast,
      crude: crude,
      extractionYield: extractionYield,
      machine: machine,
      note: note,
      deleted: false
    }

    var result = ExtractionProcess.update(id, {$set: object});

    return result;
  },
  deleteProcessExtraction: function(id) {
    var object = {
      deleted: true
    }

    var result = ExtractionProcess.update(id, {$set: object});

    return result;
  }
});
