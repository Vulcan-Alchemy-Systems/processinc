import { Template } from 'meteor/templating';

import './locationView.html';

(function() {
    'use strict';

    // on created
    Template.locationView.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;
        this.subscribe('singleLocation', id);
        this.subscribe('allLocationRooms', id);
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
      },
      rooms: function() {
        var id = Router.current().params._id;
        var results = Room.find({locationId: id}).fetch();
        return results;
      },
    });

    // events
    Template.locationView.events({
      'click #update': function(event) {

      },
      'click #newRoom': function(event) {
        event.preventDefault();

        $('.modal-compose').modal();
      },
      'click #saveRoomBtn': function(event) {
        event.preventDefault();
        var locationId = Router.current().params._id;
        var name = $('#name').val();
        var description = $('#description').val();
        var type = $('#type').val();
        var active = $('#active').is(":checked");

        Meteor.call('createRoom', locationId, name, description, active, type, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Room was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false
            }, function() {
              $('#newRoomForm').trigger("reset");
              $('.modal-compose').modal('toggle');
            });
          }
        });

      }
    });
})();
