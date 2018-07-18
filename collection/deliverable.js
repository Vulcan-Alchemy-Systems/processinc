import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Deliverable = new Meteor.Collection("deliverable");

Deliverable.allow({
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

DeliverableSchema = new SimpleSchema({});

Deliverable.attachSchema(DeliverableSchema);

Meteor.methods({
  createDeliverable: function() {

  },
  updateDeliverable: function() {

  },
  deleteDeliverable: function() {

  }
});
