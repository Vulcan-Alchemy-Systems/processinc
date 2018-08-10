import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

Location = new Meteor.Collection("location");

Location.allow({
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

LocationSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },

  // description
  description: {
    type: String,
    label: "Description",
    optional: true,
  },

  // street
  street: {
    type: String,
    label: "Street",
    optional: false,
  },

  // streetCont
  streetCont: {
    type: String,
    label: "Street",
    optional: true,
  },

  // state
  state: {
    type: String,
    label: "State",
    optional: false,
  },

  city: {
    type: String,
    label: "City",
    optional: false,
  },


  // postal
  postal: {
    type: String,
    label: "Postal",
    optional: false,
  },

  // phone
  phone: {
    type: String,
    label: "Phone",
    optional: false,
  },

  // fax
  fax: {
    type: String,
    label: "Fax",
    optional: true,
  },

  // active
  active: {
    type: Boolean,
    label: "Active",
    optional: false,
  },

  deleted: {
    type: Boolean,
    label: "Deleted",
    optional: false,
  },
  // created
  created: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    }
  },
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    }
  }
});

Location.attachSchema(LocationSchema);

Meteor.methods({
  createLocation: function(name, description, street, streetCont, city, state, postal, phone, fax, active) {
    var object = {
      name: name,
      description: description,
      street: street,
      streetCont: streetCont,
      city: city,
      state: state,
      postal: postal,
      phone: phone,
      fax: fax,
      active: active,
      deleted: false
    }

    var isSafeToProcess = Match.test( object, {

    });

    var result = Location.insert(object);

    return result;
  },
  updateLocation: function(id, name, description, street, streetCont, city, state, postal, phone, fax, active) {
    var object = {
      name: name,
      description: description,
      street: street,
      streetCont: streetCont,
      city: city,
      state: state,
      postal: postal,
      phone: phone,
      fax: fax,
      active: active,
      deleted: false
    }


    var isSafeToProcess = Match.test( object, {

    });

    var result = Location.update(id, {$set: object});

    return result;
  },
  deleteLocation: function(id) {
    var result = Location.update(id, {$set: {
      deleted: true
    }});

    return result;
  }
});
