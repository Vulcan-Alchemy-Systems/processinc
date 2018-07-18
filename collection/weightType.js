import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

WeightType = new Meteor.Collection("weightType");

WeightType.allow({
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

WeightTypeSchema = new SimpleSchema({
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

WeightType.attachSchema(WeightTypeSchema);

Meteor.methods({
  createWeightType: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = WeightType.insert(object);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Weight Type');
    }
  },
  updateWeightType: function(_id, name) {
    var object = {
      _id: _id,
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      _id: String,
      name: String
    });

    if ( isSafeToProcess) {
      var result = WeightType.update(_id, {$set: {
        name: name
      }});

      return result;
    } else {
      throw new Meteor.Error('Failed to save Weight Type');
    }
  },
  deleteWeightType: function(_id) {
    var object = {
      _id: _id
    }

    var isSafeToProcess = Match.test( object, {
      _id: String
    });

    if ( isSafeToProcess) {
      var result = WeightType.remove({'_id': _id});

      return result;
    } else {
      throw new Meteor.Error('Failed to delete Weight Type');
    }
  }
});
