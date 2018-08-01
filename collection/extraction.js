import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Extraction = new Meteor.Collection("extraction");

Extraction.allow({
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

ExtractionSchema = new SimpleSchema({
  // userId
  userId: {
    type: String,
    label: "Lab Tech",
    optional: false,
  },

  // jobId
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },

  // machineId
  machineId: {
    type: String,
    label: "Machine",
    optional: false,
  },

  // start
  start: {
    type: Date,
    label: "Start",
    optional: false,
  },

  // end
  end: {
    type: Date,
    label: "End",
    optional: false,
  },

  // preWeight
  preWeight: {
    type: String,
    label: "Material Weight",
    optional: false,
  },

  // postWeight
  postWeight: {
    type: String,
    label: "Post Blast Weight",
    optional: false,
  },

  // crudeWeight
  crudeWeight: {
    type: String,
    label: "Crude Weight",
    optional: false,
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
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});

Extraction.attachSchema(ExtractionSchema);

Meteor.methods({
  createExtraction: function(userId, jobId, machineId, start, end, preWeight, postWeight, crudeWeight){
    var object = {
      userId: userId,
      jobId: jobId,
      machineId: machineId,
      start: start,
      end: end,
      preWeight: preWeight,
      postWeight: postWeight,
      crudeWeight: crudeWeight,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      userId: String,
      jobId: String,
      machineId: String,
      start: Date,
      end: Date,
      preWeight: String,
      postWeight: String,
      crudeWeight: String
    });

    var result = Extraction.insert(object);

    return result;
  },
  updateExtraction: function(id, userId, jobId, machineId, start, end, preWeight, postWeight, crudeWeight) {
    var object = {
      userId: userId,
      jobId: jobId,
      machineId: machineId,
      start: start,
      end: end,
      preWeight: preWeight,
      postWeight: postWeight,
      crudeWeight: crudeWeight,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      userId: String,
      jobId: String,
      machineId: String,
      start: Date,
      end: Date,
      preWeight: String,
      postWeight: String,
      crudeWeight: String
    });

    var result = Extraction.update(id, {$set: object});

    return result;
  },
  deleteExtraction: function(id) {
    var result = Extraction.update(id, {$set: {
      deleted: true
    }});

    return result;
  }
});
