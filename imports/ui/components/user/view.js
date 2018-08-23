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
      this.subscribe('userJobHistory', userId)
    });
  });

  // helpers
  Template.userView.helpers({
    user: function() {
      var userId = Router.current().params._id;
      var result = Meteor.users.findOne({_id: userId}, {fields: {profile: 1, emails: 1, mailingAddress: 1, createdAt: 1, roles: 1}});
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
    },
    userHistory: function() {
      var userId =  Router.current().params._id;
      var jobHistory = JobHistory.find({createdBy: userId, deleted: false},{skip: 0, limit: 5, sort: {created: -1}}).fetch();

      return jobHistory;
    }
  });

  // events
  Template.userView.events({
    // userUpdateBtn
    'click #userUpdateBtn': function(event) {
      event.preventDefault();

      var userId = Router.current().params._id;

      var result = Meteor.users.findOne({_id: userId}, {fields: {profile: 1, emails: 1, mailingAddress: 1, createdAt: 1, roles: 1}});

      $('#email').val(result.emails[0].address);
      $('#firstName').val(result.profile.firstName);
      $('#lastName').val(result.profile.lastName);
      $('#displayName').val(result.profile.displayName);
      $('#birthday').val(result.profile.birthday);
      $('#gender').val(result.profile.gender);
      $('#website').val(result.profile.website);
      $('#status').val(result.profile.status);

      if(result.mailingAddress) {
        $('#street').val(result.mailingAddress.street);
        $('#streetCont').val(result.mailingAddress.streetCont);
        $('#city').val(result.mailingAddress.city);
        $('#state').val(result.mailingAddress.state);
        $('#postal').val(result.mailingAddress.postal);
        $('#phone').val(result.mailingAddress.phone);
      }

      $('#updateUserModal').modal('toggle');
    },

    // saveUserBtn
    'click #saveUserBtn': function(event) {
      event.preventDefault();

      var userId = Router.current().params._id;
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var displayName = $('#displayName').val();
      var status = $('#status').val();
      var birthday = $('#birthday').val();
      var website = $('#website').val();
      var gender = $('#gender').val();

      var street = $('#street').val();
      var streetCont = $('#streetCont').val();
      var city =  $('#city').val();
      var state = $('#state').val();
      var postal = $('#postal').val();
      var phone = $('#phone').val();
      var email = $('#email').val();

      Meteor.call('userUpdate', userId, firstName, lastName, displayName, status, birthday, street, streetCont, city, state, postal, phone, email, website, gender, function(error, result) {
        if(error) {
          swal('Error', error, 'error');
        } else {
          swal({
            title: 'Success',
            text: 'The user was saved.',
            type: 'success',
            closeModal: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
          }, function() {
            $('#updateUserModal').modal('toggle');
          });
        }
      });
    },

    // userDeleteBtn
    'click #userDeleteBtn': function(event) {
      event.preventDefault();
      var userId =  Router.current().params._id;
      swal({
          title: 'Are you sure?',
          text: 'This will remove this user!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          closeOnConfirm: false,
          closeOnCancel: false
      }, function(isConfirm) {
          if (isConfirm) {
            var id = Router.current().params._id;
            Meteor.call('removeUser', id, function(error, result) {
                if(error) {
                  swal('Error', error, 'error');
                } else {
                  swal('Deleted!', 'The user has been removed.', 'success');
                }
              });
          } else {
              swal('Cancelled', 'The User is safe :)', 'error');
          }
      });
    },

    // newRoleBtn
    'click #createRoleBtn': function(event) {
      event.preventDefault();
      $('#createRoleModal').modal('toggle');
    },

    // saveRoleBtn
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

    // remove-role
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
