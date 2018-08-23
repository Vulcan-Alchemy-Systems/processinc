import { Template } from 'meteor/templating';

import './profile.html';

(function() {
    'use strict';

    // onCreated
    Template.profile.onCreated(function() {
      this.autorun(() => {
          this.subscribe('singleUser', Meteor.userId());
      });
    });

    // helpers
    Template.profile.helpers({
      profileEmail: function(emails) {
        if (Meteor.user()) {
          var emails = Meteor.user().emails;
          return emails[0].address;
        }
      },
      profileCreatedAt: function() {

      },

      listUserRoles: function() {
        var user = Meteor.user();
        var result = Roles.getRolesForUser(user);
        return result;
      },
      user: function() {
        var result = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {profile: 1, emails: 1, mailingAddress: 1, createdAt: 1, roles: 1}});
        console.log(result);
        return result;
      }
    });

})();
