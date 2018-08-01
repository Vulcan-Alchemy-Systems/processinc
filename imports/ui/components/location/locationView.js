import { Template } from 'meteor/templating';

import './locationView.html';

(function() {
    'use strict';

    // on created
    Template.locationView.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;

        this.subscribe('singleLocation', id);
      });
    });

    // on rendered
    Template.locationView.onRendered(function() {

    });

    // helpers
    Template.locationView.helpers({
      location: function() {
        var id = Router.current().params._id;
        var results = Location.findOne({_id: id});
        return results;
      }
    });

    // events
    Template.locationView.events({
      'click #update': function(event) {

      }
    });
})();
