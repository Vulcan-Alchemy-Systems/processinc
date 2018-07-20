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
