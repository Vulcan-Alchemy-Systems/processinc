import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Strain = new Meteor.Collection("strain");

Strain.allow({
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

StrainSchema = new SimpleSchema({});

Strain.attachSchema(StrainSchema);

Meteor.methods({
  createStrain: function() {

  },
  updateStrain: function() {

  },
  deleteStrain: function() {

  }
});
