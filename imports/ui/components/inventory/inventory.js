import { Template } from 'meteor/templating';

import './inventory.html';

(function() {
    'use strict';

    // on created
    Template.inventory.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allDeliverable');
        this.subscribe('allJobs');
      });
    });

    // on rendered
    Template.inventory.onRendered(function() {});

    // helpers
    Template.inventory.helpers({
      deliverables: function() {
        var balance = 0;
        var weightIn = 0;
        var weightOut = 0;

        return Deliverable.find({}, {sort: {date: 1}}).map(function(values) {
          if(! values.deleted) {
            if(! values.delivered) {
              balance = balance + parseFloat(values.weight);
              weightIn = values.weight;
              weightOut = 0;
            } else {
              balance =  balance - parseFloat(values.weight);

              if(balance < 0) {
                balance = 0;
              }

              weightOut = values.weight;
              weightIn = values.weight;
            }

            return {
              _id: values._id,
              created: values.created,
              createdBy: values.createdBy,
              date: values.date,
              deleted: values.deleted,
              jobId: values.jobId,
              lot: values.lot,
              userId: values.userId,
              weightIn: weightIn,
              weightOut: weightOut,
              weightType: values.weightType,
              balance: balance
            }
          }
        });
      },
    });

    // events
    Template.inventory.events({
      'click .btn-ship': function(event) {
        event.preventDefault();
        console.log(this);
        var id = this._id;
        swal({
          title: 'Are you sure?',
          text: 'This will remove the item from inventory and mark it as delivered!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Deliver',
          cancelButtonText: 'Cancel',
          closeOnConfirm: true,
          closeOnCancel: true,
          dangerMode: false,
        }, function(isConfirm){
            Meteor.call('markDeliverable', id, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              }
            });
        });
      }
    });
})();
