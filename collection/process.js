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

  // userId
  userId: {
    type: String,
    label: "User",
    optional: false,
  },

  // weight
  weight: {
    type: String,
    label: "Weight",
    optional: true,
  },

  // weightType
  weightType: {
    type: String,
    label: "Weight Type",
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
  createProcess: function(jobId, name, date, userId, weight, weightType) {
    var object = {
      jobId: jobId,
      name: name,
      date: date,
      userId: userId,
      weight: weight,
      weightType: weightType
    }

    var result = Process.insert(object);

    return result;
  },
  updateProcess: function(id, jobId, name, date, userId, weight, weightType) {
    var object = {
      jobId: jobId,
      name: name,
      date: date,
      userId: userId,
      weight: weight,
      weightType: weightType
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
