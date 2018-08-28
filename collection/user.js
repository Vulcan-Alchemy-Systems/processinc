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
  userCreate: function(password, firstName, lastName, displayName, status, birthday, street, streetCont, city, state, postal, phone, email, website, gender) {
    var profile = {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      status: status,
      birthday: birthday,
      website: website,
      gender: gender
    }

    var mailingAddress = {
      street: street,
      streetCont: streetCont,
      city: city,
      state: state,
      postal: postal,
      phone: phone
    }

    var result = Accounts.createUser({
      email: email,
      password: password,
      profile: profile,
      mailingAddress: mailingAddress
    });

    return result;
  },

  userUpdate: function(userId, firstName, lastName, displayName, status, birthday, street, streetCont, city, state, postal, phone, email, website, gender) {
    var profile = {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      status: status,
      birthday: birthday,
      website: website,
      gender: gender
    }

    var mailingAddress = {
      street: street,
      streetCont: streetCont,
      city: city,
      state: state,
      postal: postal,
      phone: phone
    }

    var object = {
      email: email,
      mailingAddress: mailingAddress,
      profile: profile
    }

    var result = Meteor.users.update(userId, {$set: object});

    return result;
  },

  removeUser: function(userId) {

    var profile = {
      status: 'Deleted'
    }

    var object = {
      profile: profile
    }

    var result = Meteor.users.update(userId, {$set: object});

    console.log(userId);

    return result;
  },

  addUserToRole: function(user, role) {
    return Roles.addUsersToRoles(user, role);
  },

  // remove role
  removeUserRole: function(user, role) {
    return Roles.removeUsersFromRoles(user, role);
  },
});
