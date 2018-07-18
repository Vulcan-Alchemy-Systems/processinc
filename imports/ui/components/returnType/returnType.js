import { Template } from 'meteor/templating';

import './returnType.html';

(function() {
    'use strict';

    // onCreated
    Template.returnType.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allReturnType');
      });
    });

    // onRendered
    Template.returnType.onRendered(function(){});

    // helpers
    Template.returnType.helpers({
      returnTypes: function() {
        var results = ReturnType.find().fetch();
        return results;
      }
    });

    // events
    Template.returnType.events({
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

        Meteor.call('createReturnType', name, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Return Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .edit-return-type': function(event) {
        event.preventDefault();

        $('#name').val(this.name);
        $('#_id').val(this._id);
        $('#saveBtn').attr('id', 'editBtn');
        $('.modal-compose').modal('toggle');
      },
      'click #editBtn': function(event) {
        event.preventDefault();

        event.preventDefault();

        var _id = $('#_id').val();
        var name = $('#name').val();

        Meteor.call('updateReturnType', _id, name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Return Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .delete-return-type': function(event) {
        event.preventDefault();

        var _id = this._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Return Type!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteReturnType', _id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal('Deleted!', 'Your Return Type has been deleted.', 'success');
                  }
                });
            } else {
                swal('Cancelled', 'Your Return Type is safe :)', 'error');
            }
        });
      }
    });

})();
