import { Template } from 'meteor/templating';

import './list.html';

// on created
Template.user.onCreated(function() {
  this.autorun(() => {
    // subscribe
    this.subscribe('allUser');
    this.subscribe('allRole');
  });
});

// on rendered
Template.user.onRendered(function() {});

// helpers
Template.user.helpers({
  users: function() {
    var results = Meteor.users.find({}, {fields: {profile: 1, emails: 1, createdAt: 1}});
    return results;
  },
  getUserEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  },
});
