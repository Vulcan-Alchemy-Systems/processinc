import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});


// methods
Meteor.methods({
  userCreate: function(email, password, status) {
    var object = {
      email: email,
      password: password,
      status: status
    }

    var isSafeToProcess = Match.test( object, {
      email: String,
      password: String,
      status: String
    });

    if ( isSafeToProcess) {
      var result = Accounts.createUser({
        email: email,
        password: password,
        profile: {
          status: status
        }
      });
      return result;
    } else {
      throw new Meteor.Error('Failed to save user');
    }
  },

  userUpdate: function(email, password, status, birthday, phone) {
    var object = {
      email: email,
      password: password,
      status: status,
      birthday: birthday,
      phone: phone
    }

    var isSafeToProcess = Match.test( object, {
      email: String,
      password: String,
      status: String,
      birthday: String,
      phone: String
    });

    if ( isSafeToProcess) {

    } else {
      throw new Meteor.Error('Failed to save user');
    }
  },

  removeUser: function(id) {

  },

  addUserToRole: function(user, role) {
    return Roles.addUsersToRoles(user, role);
  },

  // remove role
  removeUserRole: function(user, role) {
    return Roles.removeUsersFromRoles(user, role);
  },
});
