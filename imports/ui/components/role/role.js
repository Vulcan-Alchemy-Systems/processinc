import { Template } from 'meteor/templating';

import './role.html';

(function() {
    'use strict';

    // onCreated
    Template.role.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allRole');
      });
    });

    // onRendered
    Template.role.onRendered(function() {});

    // helpers
    Template.role.helpers({
      roles: function() {
        var results = Roles.getAllRoles();
        return results;
      }
    });

    // events
    Template.role.events({
      'click #create': function(event) {
        event.preventDefault();
        $('#name').val('');
        $('#editBtn').attr('id', 'saveBtn');
        $('.modal-compose').modal();
      },
      'click #saveBtn': function(event) {
        event.preventDefault();
        var name = $('#name').val();

        Meteor.call('createRole', name, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Role was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .edit-role': function(event) {
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

        Meteor.call('updateRole', _id, name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Role was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .delete-role': function(event) {
        event.preventDefault();

        var _id = this._id;
        var name = this.name;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this role!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteRole', name, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal('Deleted!', 'Your Role has been deleted.', 'success');
                  }
                });
            } else {
                swal('Cancelled', 'Your Role is safe :)', 'error');
            }
        });
      }
    });
})();
