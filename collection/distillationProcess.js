import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

DistillationProcess = new Meteor.Collection("distillationProcess");

DistillationProcess.allow({
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

distillationProcessSchema = new SimpleSchema({
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

  // pass
  pass: {
    type: String,
    label: "Pass",
    optional: false,
  },

  // runStart
  runStart: {
    type: String,
    label: "Run Start",
    optional: false,
  },

  // runEnd
  runEnd: {
    type: String,
    label: "Run End",
    optional: false,
  },

  // amountStart
  amountStart: {
    type: Number,
    label: "Amount Start",
    optional: false,
  },

  // amountEnd
  amountEnd: {
    type: Number,
    label: "Amount End",
    optional: false,
  },

  // machine
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

DistillationProcess.attachSchema(distillationProcessSchema);

Meteor.methods({
  createDistillationProcess: function(jobId, date, shift, userId, pass, runStart, runEnd, amountStart, amountEnd, machine, note) {
    var object = {
      jobId: jobId,
      date: date,
      shift: shift,
      userId: userId,
      pass: pass,
      runStart: runStart,
      runEnd: runEnd,
      amountStart: amountStart,
      amountEnd: amountEnd,
      machine: machine,
      note: note,
      deleted: false
    }

    var result = DistillationProcess.insert(object);

    return result;
  },
  updateDistillationProcess: function(id, jobId, date, shift, userId, pass, runStart, runEnd, amountStart, amountEnd, machine, note) {
    var object = {
      jobId: jobId,
      date: date,
      shift: shift,
      userId: userId,
      pass: pass,
      runStart: runStart,
      runEnd: runEnd,
      amountStart: amountStart,
      amountEnd: amountEnd,
      machine: machine,
      note: note,
      deleted: false
    }

    var result = DistillationProcess.update(id, {$set: object});

    return result;
  },
  deleteDistillationProcess: function(id) {
    var object = {
      deleted: true
    }

    var result = DistillationProcess.update(id, {$set: object});

    return result;
  }
});
