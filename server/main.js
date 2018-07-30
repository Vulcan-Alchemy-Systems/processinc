import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // GrowType
  if(GrowType.find().count() === 0) {
    console.log('Inserting grow types');
    JSON.parse(Assets.getText("growType.json")).growType.forEach(function(doc) {
      if(doc._id) {
        var result = GrowType.insert(doc);
        console.log('Inserted ' + result + ' grow type');
      }
    });
  }

  // IntakeType
  if(IntakeType.find().count() === 0) {
    console.log('Inserting intake types');
    JSON.parse(Assets.getText("intakeType.json")).intakeType.forEach(function(doc) {
      if(doc._id) {
        var result = IntakeType.insert(doc);
        console.log('Inserted ' + result + ' intake type');
      }
    });
  }

  // ReturnType
  if(ReturnType.find().count() === 0) {
    console.log('Inserting return types');
    JSON.parse(Assets.getText("returnType.json")).returnType.forEach(function(doc) {
      if(doc._id) {
        var result = ReturnType.insert(doc);
        console.log('Inserted ' + result + ' return type');
      }
    });
  }

  // Roles
  if(Roles.getAllRoles().count() === 0) {
    console.log('Inserting roles');
    JSON.parse(Assets.getText("roles.json")).role.forEach(function(doc) {
      if(doc._id) {
        Roles.createRole(doc.name);
      }
    });
  }

  // admin

  // WeightType
  if(WeightType.find().count() === 0) {
    console.log('Inserting weight types');
    JSON.parse(Assets.getText("weightType.json")).weightType.forEach(function(doc) {
      if(doc._id) {
        var result = WeightType.insert(doc);
        console.log('Inserted ' + result + ' weight type');
      }
    });
  }
});
