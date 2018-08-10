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
        this.subscribe('allLocationJobs', id);
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
      jobs: function() {
          var id = Router.current().params._id;
          var results = Job.find({locationId: id}).fetch();
          return results;
      }
    });

    // events
    Template.locationView.events({
      'click #update': function(event) {

      },
      'click #newRoom': function(event) {
        event.preventDefault();

        $('#newRoomModal').modal('toggle');
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
              $('#newRoomModal').modal('toggle');
            });
          }
        });
      },
      'click #deleteLocationBtn': function(event) {
        event.preventDefault();
        var id = Router.current().params._id;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Location!',
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
              Meteor.call('deleteLocation', id, function(error, result) {
                if(error) {
                  swal('Error', error, 'error');
                } else {
                  swal({
                    title: 'Success',
                    text: 'The Location was deleted.',
                    type: 'success',
                    closeModal: true,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                  }, function() {
                    // redirect to view
                      Router.go('/location');
                  });
                }
              });
            } else {
                swal('Cancelled', 'The Location was not deleted', 'error');
            }
          });
      },

      'click #editLocationBtn': function(event) {
        event.preventDefault();
        var id = Router.current().params._id;
        var results = Location.findOne({_id: id});

        $('#locationName').val(results.name);
        $('#street').val(results.street);
        $('#streetCont').val(results.streetCont);
        $('#city').val(results.city);
        $('#state').val(results.state);
        $('#postal').val(results.postal);
        $('#phone').val(results.phone);
        $('#fax').val(results.fax);

        if(results.active) {
          $('#locationActive').prop('checked', true);
        }

        $('#editLocationModal').modal('toggle');
      },
      'click #locationSaveBtn': function(event) {
        event.preventDefault();

        var locationId = Router.current().params._id;

        var locationName = $('#locationName').val();
        var locationDescription = $('#locationDescription').val();
        var street = $('#street').val();
        var streetCont = $('#streetCont').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var postal = $('#postal').val();
        var phone = $('#phone').val();
        var fax = $('#fax').val();
        var locationActive = $('#locationActive').is(":checked");

        Meteor.call('updateLocation', locationId, locationName, locationDescription, street, streetCont, city, state, postal, phone, fax, locationActive, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Location was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false
            }, function() {
              $('#locationForm').trigger("reset");
              $('#editLocationModal').modal('toggle');
            });
          }
        });
      }
    });
})();
