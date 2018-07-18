// allIntakeType
Meteor.publish("allIntakeType", function() {
  return IntakeType.find();
});
