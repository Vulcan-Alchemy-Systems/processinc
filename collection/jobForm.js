import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

JobForm = new Meteor.Collection("jobForm");

JobForm.allow({
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

JobFormSchema = new SimpleSchema({
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },
  intakeType: {
    type: String,
    label: "Intake Type",
    optional: false,
  },
  growType: {
    type: String,
    label: "Grow Type",
    optional: true,
  },
  strain: {
    type: String,
    label: "Strain",
    optional: true,
  },
  condition: {
    type: String,
    label: "Condition",
    optional: true,
  },
  labTested: {
    type: String,
    label: "Lab Tested",
    optional: true,
  },
  labSheetProvided: {
    type: String,
    label: "Lab Sheet Provided",
    optional: true,
  },
  trackingEnabled: {
    type: String,
    label: "Tracking Enabled",
    optional: true,
  },
  biomassWeight: {
    type: String,
    label: "Biomass Weight",
    optional: true,
  },
  containerWeight: {
    type: String,
    label: "Container Weight",
    optional: true,
  },
  prerocessing: {
    type: String,
    label: "Prerocessing",
    optional: true,
  },
  preprocessingNote: {
    type: String,
    label: "Preprocessing Note",
    optional: true,
  },
  returnType: {
    type: String,
    label: "Return Type",
    optional: true,
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


JobForm.attachSchema(JobFormSchema);

Meteor.methods({
  createJobForm: function(jobId,intakeType, growType, strain, condition, labTested, labSheetProvided, trackingEnabled, biomassWeight, containerWeight, prerocessing, preprocessingNote, returnType) {
    var object = {
      jobId: jobId,
      intakeType: intakeType,
      growType: growType,
      strain: strain,
      condition: condition,
      labTested: labTested,
      labSheetProvided: labSheetProvided,
      trackingEnabled: trackingEnabled,
      biomassWeight: biomassWeight,
      containerWeight: containerWeight,
      prerocessing: prerocessing,
      preprocessingNote: preprocessingNote,
      returnType: returnType,
      deleted: false,
    }

    var isSafeToProcess = Match.test( object, {
      biomassWeight: String,
      returnType: String,
      intakeType: String
    });

    var result = JobForm.insert(object);

    return result;
  },
  updateJobForm: function(id, intakeType, growType, strain, condition, labTested, labSheetProvided, trackingEnabled, biomassWeight, containerWeight, prerocessing, preprocessingNote, returnType) {
    var object = {
      intakeType: intakeType,
      growType: growType,
      strain: strain,
      condition: condition,
      labTested: labTested,
      labSheetProvided: labSheetProvided,
      trackingEnabled: trackingEnabled,
      biomassWeight: biomassWeight,
      containerWeight: containerWeight,
      prerocessing: prerocessing,
      preprocessingNote: preprocessingNote,
      returnType: returnType,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      biomassWeight: String,
      returnType: String,
      intakeType: String
    });

    var result = JobForm.update(id, {$set: object});
  },
  deleteJobForm: function(id) {
    var result = JobForm.update(id, {$set: {
      deleted: true
    }});

    return result;
  }
});
