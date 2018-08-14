import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Room = new Meteor.Collection("room");

Room.allow({
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

RoomSchema = new SimpleSchema({
  // locationId
  locationId: {
    type: String,
    label: "Location",
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

  // active
  active: {
    type: Boolean,
    label: "Active",
    optional: true,
  },

  // type
  type: {
    type: String,
    label: "Type",
    optional: false,
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
});

Room.attachSchema(RoomSchema);

Meteor.methods({
  createRoom: function(locationId, name, description, active, type) {
    var object = {
      locationId: locationId,
      name: name,
      description: description,
      active: active,
      type: type,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      locationId: String,
      name: String,
      description: String,
      type: String
    });

    var result = Room.insert(object);
    return result;

    if ( isSafeToProcess) {
      var result = Room.insert(object);
      return result;
    } else {
      throw new Meteor.Error('Failed to save Room');
    }
  },
  updateRoom: function(id, locationId, name, description, active, type) {
    var object = {
      locationId: locationId,
      name: name,
      description: description,
      active: active,
      type: type,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      locationId: String,
      name: String,
      description: String,
      type: String
    });

    var result = Room.update(id, {$set: object});
    return result;

    if ( isSafeToProcess) {
      var result = Room.update(id, {$set: object});
      return result;
    } else {
      throw new Meteor.Error('Failed to save Room');
    }
  },
  deleteRoom: function(id) {
    var object = {
      deleted: true
    }
    var result = Room.update(id, {$set: object});
    return result;
  }
});
