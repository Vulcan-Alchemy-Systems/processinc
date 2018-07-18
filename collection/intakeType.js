import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

SimpleSchema.extendOptions(['autoform']);

IntakeType = new Meteor.Collection("intakeType");

IntakeType.allow({
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

IntakeTypeSchema = new SimpleSchema({
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

IntakeType.attachSchema(IntakeTypeSchema);

Meteor.methods({
  createIntakeType: function(name) {
    var object = {
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      name: String
    });

    if ( isSafeToProcess) {
      var result = IntakeType.insert(object);

      return result;
    } else {
      throw new Meteor.Error('Failed to save Intake Type');
    }
  },
  updateIntakeType: function(_id, name) {
    var object = {
      _id: _id,
      name: name
    }

    var isSafeToProcess = Match.test( object, {
      _id: String,
      name: String
    });

    if ( isSafeToProcess) {
      var result = IntakeType.update(_id, {$set: {
        name: name
      }});

      return result;
    } else {
      throw new Meteor.Error('Failed to save Intake Type');
    }
  },
  deleteIntakeType: function(_id) {
    var object = {
      _id: _id
    }

    var isSafeToProcess = Match.test( object, {
      _id: String
    });

    if ( isSafeToProcess) {
      var result = IntakeType.remove({'_id': _id});

      return result;
    } else {
      throw new Meteor.Error('Failed to delete Intake Type');
    }
  }
});
