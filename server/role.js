Meteor.publish( 'allRole', function() {

  return Meteor.roles.find({});
});

Meteor.publish( 'singleRole', function(id) {
  check(id, String);
  return Meteor.users.find({_id: id});
});
