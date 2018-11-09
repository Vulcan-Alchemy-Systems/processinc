import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Process = new Meteor.Collection("process");

Process.allow({
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

ProcessSchema = new SimpleSchema({
  // jobId
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },

  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },

  // date
  date: {
    type: Date,
    label: "Date",
    optional: false,
  },

  // start
  start: {
    type: Date,
    label: "Start",
    optional: true,
  },

  // end
  end: {
    type: Date,
    label: "End",
    optional: true,
  },

  // userId
  userId: {
    type: String,
    label: "User",
    optional: false,
  },

  // weight
  weight: {
    type: String,
    label: "Start Weight",
    optional: true,
  },

  endWeight: {
    type: String,
    label: "End Weight",
    optional: true,
  },

  machine: {
    type: String,
    label: "machine",
    optional: true,
  },

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
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});


Process.attachSchema(ProcessSchema);

Meteor.methods({
  createProcess: function(jobId, name, date, userId, weight, start, end, endWeight, machine) {
    var object = {
      jobId: jobId,
      name: name,
      date: date,
      userId: userId,
      weight: weight,
      deleted: false
    }

    var result = Process.insert(object);

    return result;
  },
  updateProcess: function(id, jobId, name, date, userId, weight, start, end, endWeight, machine) {
    var object = {
      jobId: jobId,
      name: name,
      date: date,
      userId: userId,
      weight: weight,
      deleted: false
    }

    var result = Process.update(id, {$set: object});

    return result;
  },
  deleteProcess: function(id) {
    var object = {
      deleted: true
    }

    var result = Process.update(id, {$set: object});

    return result;
  }
});
