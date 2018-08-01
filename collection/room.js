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

Room.attachSchema(RoomSchema);

Meteor.methods({
  createRoom: function() {

  },
  updateRoom: function() {

  },
  deleteRoom: function() {
    
  }
});
