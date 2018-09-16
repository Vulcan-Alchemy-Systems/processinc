import { Template } from 'meteor/templating';

import './jobFormUpdate.html';

(function() {
    'use strict';

    // onCreated
    Template.jobFormUpdate.onCreated(function() {
      this.autorun(() => {
        var formId = Router.current().params._formId;
        this.subscribe('allIntakeType');
        this.subscribe('allGrowType');
        this.subscribe('allReturnType');
        this.subscribe('singleJobForm', formId);
      });
    });

    // onRendered
    Template.jobFormUpdate.onRendered(jobFormUpdate);

    // helpers
    Template.jobFormUpdate.helpers({
      jobForm: function() {
        var formId = Router.current().params._formId;
        var form = JobForm.findOne({_id: formId});
        if(form) {
          return form;
        }
      },
      jobFormSelect: function(value, intakeType) {
        if(value == intakeType) {
          return 'selected';
        }
      }
    });

    // events
    Template.jobFormUpdate.events({
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
        var formId = Router.current().params._formId;

        switch(intakeType) {
          case 'u4A2hsx2k9apWWmCv':
          case 'wuwLti2ZhQBvJGWDb':
            var growType = $('#growType').val();
            var strain = $('#strain').val();
            var condition = $('#condition').val();
            var labTested = $('#labTested').is(":checked");
            var labSheetProvided = $('#labSheetProvided').is(":checked");
            var trackingEnabled = $('#trackingEnabled').is(":checked");
            var biomassWeight = $('#biomassWeight').val();
            var containerWeight = $('#containerWeight').val();
            var prerocessing = $('#prerocessing').is(":checked");
            var preprocessingNote = $('#preprocessingNote').val();
            var returnType = $('#returnType').val();

            Meteor.call('updateJobForm', formId, jobId, intakeType, growType, strain, condition, labTested, labSheetProvided, trackingEnabled, biomassWeight, containerWeight, prerocessing, preprocessingNote, returnType, function(error, result){
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
                  // record History
                  Meteor.call('createJobHistory', jobId, 'Job Form was saved');
                  Router.go('/job/'+jobId+'/view');
                });
              }
            });
          break;
        }
      }
    });

    function jobFormUpdate() {
      $('#updateJobForm').validate({
          errorPlacement: errorPlacementInput,
          // Form rules
          rules: {
            biomassWeight: {
                required: true,
                digits: true
            },
            containerWeight: {
                required: true,
                digits: true
            },
          }
      });
    }

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
})();
