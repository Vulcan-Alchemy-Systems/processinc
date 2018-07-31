import { Template } from 'meteor/templating';

import './jobView.html';

(function() {
    'use strict';

    // onCreated
    Template.jobView.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;

        this.subscribe('singleJob', id);
        this.subscribe('allJobForms', id);
        this.subscribe('allJobHistory', id);
        this.subscribe('allIntakeType');
        this.subscribe('allReturnType');
        this.subscribe('allGrowType');
        this.subscribe('allActiveUser');
      });
    });

    // onRendered
    Template.jobView.onRendered(function() {
      var id = Router.current().params._id;
      Meteor.call('createJobHistory', id, 'Job was viewed');
    });

    // helpers
    Template.jobView.helpers({
      job: function() {
        var id = Router.current().params._id;
        var result = Job.findOne({_id: id});
        return result;
      },
      jobForms: function() {
        var id = Router.current().params._id;
        var result = JobForm.find({jobId: id, deleted: false}).fetch();
        return result;
      },
      jobHistory: function() {
        var id = Router.current().params._id;
        var result = JobHistory.find({jobId: id, deleted: false}).fetch();
        return result;
      }
    });

    // events
    Template.jobView.events({
      // viewJobForm
      'click #viewJobForm': function(event) {
        event.preventDefault();
        console.log(this);
        var intakeTypeName = IntakeType.findOne({_id: this.intakeType}).name;
        var returnType = ReturnType.findOne({_id: this.returnType}).name;
        var growType = GrowType.findOne({_id: this.growType}).name;

        var createdBy = Meteor.users.findOne({_id: this.createdBy}, {fields: {emails: 1}});
        createdBy = createdBy.emails[0].address;

        var created = moment(this.created).format(Meteor.settings.public.longDate);
        var strain = this.strain;
        var condition = this.condition;
        if(this.labTested === 'true') { var labTested = 'Yes' } else { var labTested = 'No'}
        if(this.labSheetProvided === 'true') {var labSheetProvided = 'Yes'} else {var labSheetProvided = 'No'}
        if(this.trackingEnabled === 'true') {var trackingEnabled = 'Yes'} else {var trackingEnabled = 'No'}
        if(this.prerocessing === 'true') {var prerocessing = 'Yes'} else {var prerocessing = 'No'}


        $('#intakeType').html(intakeTypeName);
        $('#created').html(created);
        $('#createdBy').html(createdBy);
        $('#growType').html(growType);
        $('#strain').html(strain);
        $('#condition').html(condition);
        $('#labTested').html(labTested);
        $('#labSheetProvided').html(labSheetProvided);
        $('#trackingEnabled').html(trackingEnabled);
        $('#prerocessing').html(prerocessing);
        $('#returnType').html(returnType);

        $('#kilos').html((this.biomassWeight / 1000).toFixed(2));
        $('#grams').html((this.biomassWeight * 1).toFixed(2));
        $('#ounces').html(((this.biomassWeight / 454) * 16).toFixed(2));
        $('#pounds').html((this.biomassWeight / 454).toFixed(2));
        $('#tons').html( ((this.biomassWeight / 454) / 2000).toFixed(2) );
        // toggle
        $('#jobFormModal').modal('toggle');
      },

      // deleteJob
      'click #deleteJob': function(event) {
        event.preventDefault();

        var id = Router.current().params._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Job!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: false,
            dangerMode: true,
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteJob', id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal({
                      title: 'Success',
                      text: 'The Job was deleted.',
                      type: 'success',
                      closeModal: true,
                      closeOnClickOutside: false,
                      closeOnEsc: false,
                    }, function() {
                      // record History
                      Meteor.call('createJobHistory', id, 'Job was deleted');
                      Router.go('/job');
                    });
                  }
                });
            } else {
                swal('Cancelled', 'The Job was not deleted', 'error');
            }
        });
      }
    });
})();
