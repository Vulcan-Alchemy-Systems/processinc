import { Template } from 'meteor/templating';

import './create.html';

(function() {
    'use strict';

    // onCreated
    Template.userCreate.onCreated(function(){});

    // onRendered
    Template.userCreate.onRendered(function(){});

    // helpers
    Template.userCreate.helpers({});

    // events
    Template.userCreate.events({
      'click #saveBtn': function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();
        var status = $('#status').val();

        Meteor.call('userCreate', email, password, status, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'User was saved',
              type: 'success'
            }, function(){
              console.log('here');
            });
          }
        })
      }
    });
})();
