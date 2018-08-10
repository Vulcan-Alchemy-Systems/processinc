// allLocations
Meteor.publish("allLocations", function() {
  return Location.find({deleted: false});
});

// singleLocation
Meteor.publish("singleLocation", function(id) {
  return Location.find({_id: id});
});
