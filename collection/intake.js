import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Intake = new Meteor.Collection("intake");

Intake.allow({
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

IntakeSchema = new SimpleSchema({});

Intake.attachSchema(IntakeSchema);

Meteor.methods({
  createIntake: function() {

  },
  updateIntake: function() {

  },
  deleteIntake: function() {

  }
});
