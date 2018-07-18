import { Roles } from 'meteor/alanning:roles';


// methods
Meteor.methods({
  // create role
  createRole: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = Roles.createRole(name);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Role');
    }

  },
  // updateRole
  updateRole: function(_id, name) {
    var object = {
      name: name,
      _id: _id
    }

    var isSafeToProcess = Match.test( object, {
      name: String,
      _id: String
    });

    if ( isSafeToProcess) {
      var result = Roles.updateRole(name);

    } else {
      throw new Meteor.Error('Failed to save Role');
    }
  },
  // delete role
  deleteRole: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = Roles.deleteRole(name);
      return result;
    } else {
      throw new Meteor.Error('Failed to delete Role');
    }
  },
});
