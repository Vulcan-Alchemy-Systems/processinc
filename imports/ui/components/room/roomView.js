import { Template } from 'meteor/templating';

import './roomView.html';

(function() {
    'use strict';

    // on created
    Template.roomView.onCreated(function() {
      this.autorun(() => {
        var locationId = Router.current().params.locationId;
        var roomId = Router.current().params.roomId;
        this.subscribe('singleLocation', locationId);
        this.subscribe('singleRoom', roomId);
      });
    });

    // on rendered
    Template.roomView.onRendered(function() {

    });

    // helpers
    Template.roomView.helpers({
      room: function() {
        var roomId = Router.current().params.roomId;
        var result = Room.findOne({_id: roomId});
        return result;
      }
    });
})();
