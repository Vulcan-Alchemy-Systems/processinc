import { Template } from 'meteor/templating';

import './jobDeliverable.html';

(function() {
    'use strict';

    // onCreated
    Template.jobDeliverable.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('singleJob', jobId);
        this.subscribe('allJobDeliverable', jobId);
        this.subscribe('allActiveUser');
        this.subscribe('allWeightType');
      });
    });

    // onRendered
    Template.jobDeliverable.onRendered();

    // helpers
    Template.jobDeliverable.helpers({
      job: function() {
        var jobId = Router.current().params._id;
        var result = Job.findOne({_id: jobId});
        return result;
      },
      deliverables: function() {
        var jobId = Router.current().params._id;
        var results = Deliverable.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        return results;
      },
    });

    // events
    Template.jobDeliverable.events({
      // deliverableEditBtn
      'click #deliverableEditBtn': function(event) {
        event.preventDefault();

        $('#deliverableUser').val(this.userId);
        $('#deliverableDate').val(moment(this.date).format(Meteor.settings.public.shortDate));
        $('#deliverableWeight').val(this.weight);
        $('#weightType').val(this.weightType);
        $('#lot').val(this.lot);
        $('#deliverableId').val(this._id);

        $('#createDeliverableModal').modal('toggle');
      },

      // deliverableDeleteBtn
      'click #deliverableDeleteBtn': function(event) {
        event.preventDefault();
        var id = this._id;
        var jobId =  Router.current().params._id;
        var lot = this.lot;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Deliverable!',
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
            Meteor.call('deleteDeliverable', id, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Deliverable was deleted.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  // record History
                  Meteor.call('createJobHistory', jobId, 'Job Deliverable '+lot+' was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The Job Deliverable was not deleted', 'error');
          }
        });
      },
      // saveDeliverableBtn
      'click #saveDeliverableBtn': function(event) {
        event.preventDefault();

        var id = $('#deliverableId').val();
        var jobId =  Router.current().params._id;
        var userId = $('#deliverableUser').val();
        var date = $('#deliverableDate').val();
        var weight = $('#deliverableWeight').val();
        var weightType = $('#weightType').val();
        var lot = $('#lot').val();

        if(id) {
          Meteor.call('updateDeliverable', id, jobId, userId, date, weight, weightType, lot, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Deliverable was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createDeliverableForm').trigger("reset");
                $('#createDeliverableModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Deliverable lot#'+lot+' was updated');
              });
            }
          });
        } else {
          Meteor.call('createDeliverable', jobId, userId, date, weight, weightType, lot, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Deliverable was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createDeliverableForm').trigger("reset");
                $('#createDeliverableModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Deliverable lot#'+lot+' added to job');
              });
            }
          });
        }
      },
    });
    
})();
