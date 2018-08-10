import { Template } from 'meteor/templating';

import './location.html';

(function() {
    'use strict';

    // on created
    Template.location.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allLocations');
      });
    });

    // on rendered
    Template.location.onRendered(function() {

    });

    // helpers
    Template.location.helpers({
      locations: function() {
        var results = Location.find({deleted: false}).fetch();
        return results;
      }
    });

    Template.registerHelper('locationName', function (locationId) {
      var result = Location.findOne({_id: locationId});

      if(result) {
        return result.name;
      } else {
        return 'Unknown';
      }
    });

    // events
    Template.location.events({
      'click #create': function(event) {
        event.preventDefault();

        $('.modal-compose').modal();
      },
      'click #locationSaveBtn': function(event) {
        event.preventDefault();

        var name = $('#name').val();
        var description = $('#description').val();
        var street = $('#street').val();
        var streetCont = $('#streetCont').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var postal = $('#postal').val();
        var phone = $('#phone').val();
        var fax = $('#fax').val();
        var active = $('#active').is(":checked");

        Meteor.call('createLocation', name, description, street, streetCont, city, state, postal, phone, fax, active, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Location was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }, function() {
              $('.modal-compose').modal('toggle');
              Router.go('/location/'+result+'/view');
            });
          }
        });
      }
    });

})();
