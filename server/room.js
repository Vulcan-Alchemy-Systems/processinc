// allRooms
Meteor.publish("allRooms", function() {
  return Room.find({deleted: false});
});

// allLocationRooms
Meteor.publish("allLocationRooms", function(locationId) {
  return Room.find({locationId:locationId, deleted: false});
});

// singleRoom
Meteor.publish("singleRoom", function(id) {
  return Room.find({_id: id});
});
