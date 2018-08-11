import { Template } from 'meteor/templating';

import './machineView.html';

(function() {
    'use strict';

    // on created
    Template.machineView.onCreated(function() {
      var machineId = Router.current().params.id;
      this.subscribe('singleMachine', machineId);
      this.subscribe('allLocations');
      this.subscribe('allRooms');
    });

    // on rendered
    Template.machineView.onRendered(function() {

    });

    // helpers
    Template.machineView.helpers({
      machine: function() {
        var machineId = Router.current().params.id;
        var result = Machine.findOne({_id:machineId});
        return result;
      }
    });

    // events
    Template.machineView.events({
      'click #editMachineBtn': function(event) {
        event.preventDefault();

        var machineId = Router.current().params.id;
        var result = Machine.findOne({_id:machineId});

        $('#machineName').val(result.name);
        $('#manufacture').val(result.manufacture);
        $('#model').val(result.model);
        $('#machineType').val(result.type);
        $('#machineStatus').val(result.status);

        $('#editModal').modal('toggle');
      },
      'click #saveMachineBtn': function(event) {
        event.preventDefault();

        var id = Router.current().params.id;
        var result = Machine.findOne({_id:id});

        var name = $('#machineName').val();
        var manufacture = $('#manufacture').val();
        var model = $('#model').val();
        var type = $('#machineType').val();
        var status = $('#machineStatus').val();
        var locationId = result.locationId;
        var roomId = result.roomId;

        Meteor.call('updateMachine', id, locationId, roomId, name, manufacture, model, type, status, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Machine was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false
            }, function() {
              $('#createMachineForm').trigger("reset");
              $('#editModal').modal('toggle');
            });
          }
        });
      },
      'click #deleteMachineBtn': function(event) {
        event.preventDefault();

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Machine!',
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
                    text: 'The Machine was deleted.',
                    type: 'success',
                    closeModal: true,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                  }, function() {
                    // redirect to view
                    Router.go('/machine');
                  });
                }
              });
            } else {
              swal('Cancelled', 'The Machine was not deleted', 'error');
            }
          });
      }
    });
})();
