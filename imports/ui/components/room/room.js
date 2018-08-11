import { Template } from 'meteor/templating';

import './room.html';

(function() {
    'use strict';

    Template.registerHelper('roomName', function (roomId) {
      var result = Room.findOne({_id: roomId});

      if(result) {
        return result.name;
      } else {
        return 'Unknown';
      }
    });
})();
