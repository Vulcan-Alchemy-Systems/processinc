import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

ReturnType = new Meteor.Collection("returnType");

ReturnType.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

ReturnTypeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
  created: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    },
  },
});

ReturnType.attachSchema(ReturnTypeSchema);

Meteor.methods({
  createReturnType: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = ReturnType.insert(object);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Return Type');
    }
  },
  updateReturnType: function(_id, name) {
    var object = {
      _id: _id,
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      _id: String,
      name: String
    });

    if ( isSafeToProcess) {
      var result = ReturnType.update(_id, {$set: {
        name: name
      }});

      return result;
    } else {
      throw new Meteor.Error('Failed to save Return Type');
    }
  },
  deleteReturnType: function(_id) {
    var object = {
      _id: _id
    }

    var isSafeToProcess = Match.test( object, {
      _id: String
    });

    if ( isSafeToProcess) {
      var result = ReturnType.remove({'_id': _id});

      return result;
    } else {
      throw new Meteor.Error('Failed to delete Return Type');
    }
  }
});
