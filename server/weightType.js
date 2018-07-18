// allReturnType
Meteor.publish("allWeightType", function() {
  return WeightType.find();
});
