import { Template } from 'meteor/templating';

import './jobCreate.html';

(function() {
    'use strict';

    // on created
    Template.jobCreate.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allActiveUser');
      });
    });

    Template.jobCreate.onRendered(function() {
      // dates
      $('#start').datepicker({container:'#datepicker-container-1'});

      $('#expectedFinish').datepicker({container:'#datepicker-container-2'});

      // validation
      $('#new-job-form').validate({
          errorPlacement: errorPlacementInput,
          // Form rules
          rules: {
              name: {
                  required: true
              },
              description: {
                required: true
              }
          }
      });

      // Necessary to place dyncamic error messages
      // without breaking the expected markup for custom input
      function errorPlacementInput(error, element) {
          if( element.parent().parent().is('.mda-input-group') ) {
              error.insertAfter(element.parent().parent()); // insert at the end of group
          }
          else if( element.parent().is('.mda-form-control') ) {
              error.insertAfter(element.parent()); // insert after .mda-form-control
          }
          else if ( element.is(':radio') || element.is(':checkbox')) {
              error.insertAfter(element.parent());
          }
          else {
              error.insertAfter(element);
          }
      }
    });

    // helpers
    Template.jobCreate.helpers({
      userId: function() {
        var userId = Router.current().params._id;
        return userId;
      },
      userList: function() {
        return Meteor.users.find({'profile.status': 'Active'}, {fields: {_id: 1, emails: 1}}).map(function(values) {
          return {
            label: values.emails[0].address,
            value: values._id
          };
        });
      }
    });

    // events
    Template.jobCreate.events({
      'click #saveBtn': function(event) {
        event.preventDefault();
        var userId = $('#userId').val();
        var name = $('#name').val();
        var description = $('#description').val();
        var start = $('#start').val();
        var expectedFinish = $('#expectedFinish').val();


        Meteor.call('createJob', userId, name, description, start, expectedFinish, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Job was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }, function() {
              Router.go('/job/'+result+'/view');
            });
          }
        });
      }
    });
})();
