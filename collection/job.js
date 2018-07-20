import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Job = new Meteor.Collection("job");

IntakeType.allow({
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

JobSchema = new SimpleSchema({
  // userId
  userId: {
    type: String,
    label: "User",
    optional: false,
  },
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
  // description
  description: {
    type: String,
    label: "Description",
    optional: false,
  },
  // start
  start: {
    type: Date,
    label: "Start",
    optional: false,
  },
  // expectedFinish
  expectedFinish: {
    type: Date,
    label: "Expected Finish",
    optional: false,
  },
  // finish
  finish: {
    type: Date,
    label: "Finish",
    optional: true,
  },
  // status
  status: {
    type: String,
    label: "Status",
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
});

Job.attachSchema(JobSchema);

Meteor.methods({
  createJob: function(userId, name, description, start, expectedFinish) {
    var object = {
      userId: userId,
      name: name,
      description: description,
      start: start,
      finish: null,
      status: 'New',
      expectedFinish: expectedFinish
    }

    var isSafeToProcess = Match.test( object, {
      userId: String,
      name: String,
      description: String,
      start: Date,
      expectedFinish: Date
    });

    console.log(object);

    var result = Job.insert(object);

    return result;

    if ( isSafeToProcess) {
      var result = Job.insert(object);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Job');
    }
  },
  updateJob: function(id, userId, name, description, start, expectedFinish, finish, status) {
    var object = {
      userId: userId,
      name: name,
      description: description,
      start: start,
      finish: finish,
      status: status,
      expectedFinish: expectedFinish,
    }

  },
  deleteJob: function(id) {

  }
});
