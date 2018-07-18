import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

GrowType = new Meteor.Collection("growType");

GrowType.allow({
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

GrowTypeSchema = new SimpleSchema({
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
    }
  },
});

GrowType.attachSchema(GrowTypeSchema);

Meteor.methods({
  createGrowType: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = GrowType.insert(object);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Grow Type');
    }
  },
  updateGrowType: function(_id, name) {
    var object = {
      _id: _id,
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      _id: String,
      name: String
    });

    if ( isSafeToProcess) {
      var result = GrowType.update(_id, {$set: {
        name: name
      }});

      return result;
    } else {
      throw new Meteor.Error('Failed to save Grow Type');
    }
  },
  deleteGrowType: function(_id) {
    var object = {
      _id: _id
    }

    var isSafeToProcess = Match.test( object, {
      _id: String
    });

    if ( isSafeToProcess) {
      var result = GrowType.remove({'_id': _id});

      return result;
    } else {
      throw new Meteor.Error('Failed to delete Grow Type');
    }
  }
});
