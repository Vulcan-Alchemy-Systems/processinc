// allActiveJobsBatchTypes
Meteor.publish("allGrowType", function() {
  return GrowType.find();
});
