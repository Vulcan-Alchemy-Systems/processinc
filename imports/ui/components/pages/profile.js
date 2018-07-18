import { Template } from 'meteor/templating';

import './profile.html';

(function() {
    'use strict';

    // onCreated
    Template.profile.onCreated(function() {
      this.autorun(() => {

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
      }
    });

})();
