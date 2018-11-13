import './user.layout.html';

// userEmail
Template.registerHelper('userEmail', function (userId) {
  if(userId) {
    var results = Meteor.users.findOne({_id: userId}, {fields: {emails: 1}});
    if(results) {
      return results.emails[0].address;
    }
    return 'Unknown';
  }
});

// userSelectList
Template.registerHelper('userSelectList', function (userId) {

  return Meteor.users.find({'profile.status': 'Active'}, {fields: {_id: 1, emails: 1}}).map(function(values) {
    return {
      label: values.emails[0].address,
      value: values._id
    };
  });
});
