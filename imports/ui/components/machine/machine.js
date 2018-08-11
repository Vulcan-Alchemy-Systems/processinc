import { Template } from 'meteor/templating';

import './machine.html';

(function() {
    'use strict';

    // on created
    Template.machine.onCreated(function() {
      this.subscribe('allMachines');
      this.subscribe('allLocations');
      this.subscribe('allRooms');
    });

    // on rendered
    Template.machine.onRendered(function() {

    });

    // helpers
    Template.machine.helpers({
      machines: function() {
        var result = Machine.find().fetch();
        return result;
      }
    });
})();
