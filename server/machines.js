// roomMachines
Meteor.publish("roomMachines", function(roomId) {
  return Machine.find({roomId: roomId});
});

// locationMachines
Meteor.publish("locationMachines", function(locationId) {
  return Machine.find({locationId: locationId});
});

// singleMachine
Meteor.publish("singleMachine", function(id) {
  return Machine.find({_id: id});
});

// allMachines
Meteor.publish("allMachines", function() {
  return Machine.find();
});
