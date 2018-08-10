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

    // events
    Template.roomView.events({
      'click #editRoomBtn': function(event) {
        event.preventDefault();
        var roomId = Router.current().params.roomId;
        var result = Room.findOne({_id: roomId});

        $('#roomName').val(result.name);
        $('#roomDescription').val(result.description);
        $('#roomType').val(result.type);

        if(result.active) {
          $('#roomActive').prop('checked', true);
        }

        $('#editRoomModal').modal('toggle');
      },
      'click #saveRoomBtn': function(event) {
        event.preventDefault();
        var roomId = Router.current().params.roomId;
        var locationId = Router.current().params.locationId;

        var name = $('#roomName').val();
        var description = $('#roomDescription').val();
        var type = $('#roomType').val();
        var active = $('#roomActive').is(":checked");

        Meteor.call('updateRoom', roomId, locationId, name, description, active, type, function(error, result) {
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
              $('#editRoomModal').modal('toggle');
            });
          }
        });
      },
      'click #deleteRoomBtn': function(event) {
        event.preventDefault();

        var id = Router.current().params.roomId;
        var locationId = Router.current().params.locationId;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Room!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          closeOnConfirm: false,
          closeOnCancel: false,
          dangerMode: true,
          }, function(isConfirm){
            if (isConfirm) {
              Meteor.call('deleteRoom', id, function(error, result) {
                if(error) {
                  swal('Error', error, 'error');
                } else {
                  swal({
                    title: 'Success',
                    text: 'The Room was deleted.',
                    type: 'success',
                    closeModal: true,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                  }, function() {
                    // redirect to view
                      Router.go('/location/' + locationId + '/view');
                  });
                }
              });
            } else {
                swal('Cancelled', 'The Room was not deleted', 'error');
            }
          });
      }
    });
})();
