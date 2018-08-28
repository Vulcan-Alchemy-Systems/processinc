import { Template } from 'meteor/templating';

import './list.html';

// on created
Template.user.onCreated(function() {
  this.autorun(() => {
    // subscribe
    this.subscribe('allActiveUser');
    this.subscribe('allRole');
  });
});

// on rendered
Template.user.onRendered(function() {});

// helpers
Template.user.helpers({
  users: function() {
    var results = Meteor.users.find({'profile.status': 'Active'}, {fields: {profile: 1, emails: 1, createdAt: 1}});
    return results;
  },
  getUserEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  },
});

// events
Template.user.events({
  // createUserBtn
  'click #createUserBtn': function(event) {
    event.preventDefault();
    $('#createUserModal').modal('toggle');
  },
  // saveUserBtn
  'click #saveUserBtn': function(event) {
    event.preventDefault();
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
    var password = $('#password').val();

    Meteor.call('userCreate', password, firstName, lastName, displayName, status, birthday, street, streetCont, city, state, postal, phone, email, website, gender, function(error, result) {
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
          $('#createUserModal').modal('toggle');
        });
      }
    });
  }
});
