import { Template } from 'meteor/templating';

import './jobFormCreate.html';

(function() {
    'use strict';

    // on created
    Template.jobFormCreate.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allIntakeType');
        this.subscribe('allGrowType');
        this.subscribe('allReturnType');
      });
    });

    // onRendered
    Template.jobFormCreate.onRendered(function() {

    });

    // helpers
    Template.jobFormCreate.helpers({

    });

    // events
    Template.jobFormCreate.events({
      'change #intakeType': function(event) {
        var intakeType = $('#intakeType').val();

        switch(intakeType) {
          // distilate
          case 'u4A2hsx2k9apWWmCv':
          case 'wuwLti2ZhQBvJGWDb':
            $('#distilate').removeClass('hidden');
          break;
          // shatter
          case 'ArgLwXYcrRWFFC7cX':
          case 'eEu47ZGp3Ae4ttnek':
            $('#shatter').removeClass('hidden');
            $('#distilate').addClass('hidden');
          break;
          //cart formr
          case 'ymuvhtv6AXQYwWCvP':
            $('#distilate').addClass('hidden');
            $('#shatter').addClass('hidden');
          break;
        }
      },
      'click #saveBtn': function(event) {
        event.preventDefault();

        var intakeType = $('#intakeType').val();
        var jobId = Router.current().params._id;

        switch(intakeType) {
          case 'u4A2hsx2k9apWWmCv':
          case 'wuwLti2ZhQBvJGWDb':
            var growType = $('#growType').val();
            var strain = $('#strain').val();
            var condition = $('#condition').val();
            var labTested = $('#labTested').is(":checked");;
            var labSheetProvided = $('#labSheetProvided').is(":checked");;
            var trackingEnabled = $('#trackingEnabled').is(":checked");;
            var biomassWeight = $('#biomassWeight').val();
            var containerWeight = $('#containerWeight').val();
            var prerocessing = $('#prerocessing').is(":checked");;
            var preprocessingNote = $('#preprocessingNote').val();
            var returnType = $('#returnType').val();

            Meteor.call('createJobForm', jobId, intakeType, growType, strain, condition, labTested, labSheetProvided, trackingEnabled, biomassWeight, containerWeight, prerocessing, preprocessingNote, returnType, function(error, result){
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Job Form was saved.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  Router.go('/job/'+jobId+'/view');
                });
              }
            });
          break;
        }
      }
    });

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

        console.log(error)
    }
})();
