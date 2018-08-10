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
        this.subscribe('allLocations');
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
        var result = JobHistory.find({jobId: id, deleted: false}, {skip: 0, limit: 5, sort: {created: -1}}).fetch();
        return result;
      }
    });

    // events
    Template.jobView.events({
      // viewJobForm
      'click #viewJobForm': function(event) {
        event.preventDefault();

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

        var biomassWeightKilos = (this.biomassWeight / 1000).toFixed(2);
        var biomassWeightGrams = (this.biomassWeight * 1).toFixed(2);
        var biomassWeightOunces = ((this.biomassWeight / 454) * 16).toFixed(2);
        var biomassWeightPounds = (this.biomassWeight / 454).toFixed(2);
        var biomassWeightTons = ((this.biomassWeight / 454) / 2000).toFixed(4);

        var containerWeightKilos = (this.containerWeight / 1000).toFixed(2);
        var containerWeightGrams = (this.containerWeight * 1).toFixed(2);
        var containerWeightOunces = ((this.containerWeight / 454) * 16).toFixed(2);
        var containerWeightPounds = (this.containerWeight / 454).toFixed(2);
        var containerWeightTons = ((this.containerWeight / 454) / 2000).toFixed(4);

        var netKilos = (biomassWeightKilos - containerWeightKilos).toFixed(2);
        var netGrams = (biomassWeightGrams - containerWeightGrams).toFixed(2);
        var netOunces = (biomassWeightOunces - containerWeightOunces).toFixed(2);
        var netPounds = (biomassWeightPounds - containerWeightPounds).toFixed(2);
        var netTons = (biomassWeightTons - containerWeightTons).toFixed(4);

        var yieldKilos = (netKilos * .05).toFixed(2);
        var yieldGrams = (netGrams * .05).toFixed(2);
        var yieldOunces = (netOunces * .05).toFixed(2);
        var yieldPounds = (netPounds * .05).toFixed(2);
        var yieldTons = (netTons * .05).toFixed(4);

        $('#kilos').html(biomassWeightKilos);
        $('#grams').html(biomassWeightGrams);
        $('#ounces').html(biomassWeightOunces);
        $('#pounds').html(biomassWeightPounds);
        $('#tons').html(biomassWeightTons);

        $('#containerKilos').html(containerWeightKilos);
        $('#containerGrams').html(containerWeightGrams);
        $('#containerOunces').html(containerWeightOunces);
        $('#containerPounds').html(containerWeightPounds);
        $('#containerTons').html(containerWeightTons);

        $('#netKilos').html(netKilos);
        $('#netGrams').html(netGrams);
        $('#netOunces').html(netOunces);
        $('#netPounds').html(netPounds);
        $('#netTons').html(netTons);

        $('#yieldKilos').html(yieldKilos);
        $('#yieldGrams').html(yieldGrams);
        $('#yieldOunces').html(yieldOunces);
        $('#yieldPounds').html(yieldPounds);
        $('#yieldTons').html(yieldTons);

        // toggle
        $('#jobFormModal').modal('toggle');
      },
      // deleteJobForm
      'click #jobFormDelete': function(event) {
        event.preventDefault();

        var jobId = Router.current().params._id;
        var jobFormId = this._id;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Job Form!',
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
            Meteor.call('deleteJobForm', jobFormId, function(error, result) {
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
                  Meteor.call('createJobHistory', jobId, 'Job Form was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The Job Form was not deleted', 'error');
          }
        });

      },

      'click #jobFormEdit': function(event) {
        event.preventDefault();

        var jobId = Router.current().params._id;
        var jobFormId = this._id;
        Router.go('/job/' + jobId + '/form/' + jobFormId + '/edit');
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
