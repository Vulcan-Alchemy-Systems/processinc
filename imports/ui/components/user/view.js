import { Template } from 'meteor/templating';

import './view.html';

(function() {
  'use strict';

  // on created
  Template.userView.onCreated(function() {
    this.autorun(() => {
      var userId = Router.current().params._id;

      // subscribe
      this.subscribe('singleUser', userId);
      this.subscribe('allRole');
      this.subscribe('userJobs', userId)
    });
  });

  // helpers
  Template.userView.helpers({
    user: function() {
      var userId = Router.current().params._id;
      var result = Meteor.users.findOne({_id: userId}, {fields: {profile: 1, emails: 1, createdAt: 1, roles: 1}});
      return result;
    },
    getUserEmail: function(emails) {
      if(emails) {
        return emails[0].address;
      }
    },
    roles: function() {
      var result = Roles.getAllRoles();
      return result;
    },
    listUserRoles: function() {
      var userId = Router.current().params._id;
      var user = Meteor.users.findOne({_id: userId}, {fields: {profile: 1, emails: 1, createdAt: 1, roles: 1}});
      var result = Roles.getRolesForUser(user);
      return result;
    },
    userJobs: function() {
      var userId =  Router.current().params._id;
      var result = Job.find({userId: userId});
      return result;
    }
  });

  // events
  Template.userView.events({
    'click #newRoleBtn': function(event) {
      event.preventDefault();

      $('.role-modal').modal('toggle');
    },
    'click #saveRoleBtn': function(event) {
      var role = $('#role').val();
      var _id = Router.current().params._id;
      var user = Meteor.users.findOne({_id: _id}, {fields: {profile: 1, emails: 1, createdAt: 1}});

      Meteor.call('addUserToRole', user, role, function (error) {
        if(error) {
          swal('Error', error, 'error');
        } else {
          $('.role-modal').modal('toggle');
          swal('Role Added', 'User was assigned role ' + role, 'success');
        }
      })
    },
    'click .remove-role': function(event) {
      event.preventDefault();
      var role = event.currentTarget.id;
      swal({
          title: 'Are you sure?',
          text: 'This will remove the role from the user!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          closeOnConfirm: false,
          closeOnCancel: false
      }, function(isConfirm) {
          if (isConfirm) {
            var _id = Router.current().params._id;
            var user = Meteor.users.findOne({_id: _id}, {fields: {profile: 1, emails: 1, createdAt: 1}});

            Meteor.call('removeUserRole', user, role, function(error, result) {
                if(error) {
                  swal('Error', error, 'error');
                } else {
                  swal('Deleted!', 'The role has been removed.', 'success');
                }
              });
          } else {
              swal('Cancelled', 'The role is safe :)', 'error');
          }
      });
    }
  });

})();
