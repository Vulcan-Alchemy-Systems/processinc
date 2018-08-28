// allUser
Meteor.publish("allUser", function() {
  return Meteor.users.find({}, {fields: {profile: 1, emails: 1, createdAt: 1, mailingAddress: 1, roles: 1}});
});

// allActiveUser
Meteor.publish("allActiveUser", function() {
  return Meteor.users.find({'profile.status': 'Active'}, {fields: {profile: 1, emails: 1, createdAt: 1, mailingAddress: 1, roles: 1}});
});

// singleUser
Meteor.publish("singleUser", function(_id) {
  return Meteor.users.find({_id: _id}, {fields: {profile: 1, emails: 1, createdAt: 1, mailingAddress: 1, roles: 1}});
});
