import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Machine = new Meteor.Collection("machine");

Machine.allow({
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

Machinechema = new SimpleSchema({
  // locationId
  locationId: {
    type: String,
    label: "Location",
    optional: false,
  },
  // roomId
  roomId: {
    type: String,
    label: "Room",
    optional: false,
  },
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
  // manufacture
  manufacture: {
    type: String,
    label: "Manufacture",
    optional: false,
  },
  // model
  model: {
    type: String,
    label: "Model",
    optional: false,
  },
  // type
  type: {
    type: String,
    label: "Type",
    optional: false,
  },
  // status
  status: {
    type: String,
    label: "Status",
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
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});

Machine.attachSchema(Machinechema);

Meteor.methods({
  createMachine: function(locationId, roomId, name, manufacture, model, type, status) {
    var object = {
      locationId: locationId,
      roomId: roomId,
      name: name,
      manufacture: manufacture,
      model: model,
      type: type,
      status: status,
      deleted: false
    }

    var result = Machine.insert(object);
    return result;

    var isSafeToProcess = Match.test( object, {
      locationId: String,
      roomId: String,
      name: String,
      manufacture: String,
      model: String,
      type: String,
      status: String
    });


    if ( isSafeToProcess) {
      var result = Machine.insert(object);
      return result;
    } else {
      throw new Meteor.Error('Failed to save machine');
    }
  },
  updateMachine: function(id, locationId, roomId, name, manufacture, model, type, status) {
    var object = {
      locationId: locationId,
      roomId: roomId,
      name: name,
      manufacture: manufacture,
      model: model,
      type: type,
      status: status,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {
      locationId: String,
      roomId: String,
      name: String,
      manufacture: String,
      model: String,
      type: String,
      status: String
    });

    var result = Machine.update(id, {$set: object});
    return result;

    if ( isSafeToProcess) {
      var result = Machine.update(id, {$set: object});
      return result;
    } else {
      throw new Meteor.Error('Failed to save Machine');
    }
  },
  deleteMachine: function(id) {
    var object = {
      deleted: true
    }
    var result = Machine.update(id, {$set: object});
    return result;
  }
});
