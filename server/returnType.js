// allReturnType
Meteor.publish("allReturnType", function() {
  return ReturnType.find();
});
