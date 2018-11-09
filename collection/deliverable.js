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

DeliverableSchema = new SimpleSchema({
  // jobId
  jobId: {
    type: String,
    label: "Job",
    optional: false,
  },

  // userId
  userId: {
    type: String,
    label: "User",
    optional: false,
  },

  // date
  date: {
    type: Date,
    label: "Date",
    optional: false,
  },

  // weight
  weight: {
    type: String,
    label: "Weight",
    optional: false,
  },

  // weightType
  weightType: {
    type: String,
    label: "Weight Type",
    optional: false,
  },

  // lot
  lot: {
    type: String,
    label: "Lot",
    optional: false,
  },

  deleted: {
    type: Boolean,
    label: "Deleted",
    optional: false,
  },

  delivered: {
    type: Boolean,
    label: "Delivered",
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

Deliverable.attachSchema(DeliverableSchema);

Meteor.methods({
  // createDeliverable
  createDeliverable: function(jobId, userId, date, weight, weightType, lot) {
    var object = {
      jobId: jobId,
      userId: userId,
      date: date,
      weight: weight,
      weightType: weightType,
      lot: lot,
      delivered: false,
      deleted: false
    }

    var result = Deliverable.insert(object);

    return result;
  },
  // updateDeliverable
  updateDeliverable: function(id, jobId, userId, date, weight, weightType, lot) {
    var object = {
      jobId: jobId,
      userId: userId,
      date: date,
      weight: weight,
      weightType: weightType,
      lot: lot,
      delivered: false,
      deleted: false
    }

    var result = Deliverable.update(id, {$set: object});

    return result;
  },
  // markDeliverable
  markDeliverable: function(id) {

    var object = {
      delivered: true
    }
    var result = Deliverable.update(id, {$set: object});
      console.log(id);
    return result;
  },
  // deleteDeliverable
  deleteDeliverable: function(id) {
    var object = {
      deleted: true
    }

    var result = Deliverable.update(id, {$set: object});

    return result;
  }
});
