import { Template } from 'meteor/templating';

import './growType.html';

(function() {
    'use strict';

    // on created
    Template.growType.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allGrowType');
      });
    });

    // on rendered
    Template.growType.onRendered(function() {});

    // helpers
    Template.growType.helpers({
      growTypes: function() {
        var results = GrowType.find().fetch();
        return results;
      }
    });

    // Events
    Template.growType.events({
      'click #create': function(event) {
        event.preventDefault();
        $('#name').val('');
        $('#_id').val();
        $('#editBtn').attr('id', 'saveBtn');
        $('.modal-compose').modal();
      },
      'click #saveBtn': function(event) {
        event.preventDefault();

        var name = $('#name').val();

        Meteor.call('createGrowType', name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Grow Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .edit-grow-type': function(event) {
        event.preventDefault();
        $('#name').val(this.name);
        $('#_id').val(this._id);
        $('#saveBtn').attr('id', 'editBtn');
        $('.modal-compose').modal('toggle');
      },
      'click .delete-grow-type': function(event) {
        event.preventDefault();

        var _id = this._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Grow Type!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteGrowType', _id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
                  }
                });
            } else {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
      },
      'click #editBtn': function(event) {
        event.preventDefault();

        var _id = $('#_id').val();
        var name = $('#name').val();

        Meteor.call('updateGrowType', _id, name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Grow Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      }
    });
})();
