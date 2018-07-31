import { Template } from 'meteor/templating';

import './intakeType.html';

(function() {
    'use strict';

    // onCreated
    Template.intakeType.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allIntakeType');
      });
    });

    // helpers
    Template.intakeType.helpers({
      intakeTypes: function() {
        var results = IntakeType.find().fetch();
        return results;
      }
    });

    // intakeTypeSelect
    Template.registerHelper('intakeTypeSelect', function () {
      return IntakeType.find().map(function(values) {
        return {
          label: values.name,
          value: values._id
        };
      });
    });

    Template.registerHelper('intakeTypeName', function(id) {    
      var result = IntakeType.findOne({_id: id});

      if(result) {
        return result.name;
      } else {
        return 'Unknown';
      }
    })

    // onRendered
    Template.intakeType.onRendered(function() {});

    // events
    Template.intakeType.events({
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

        Meteor.call('createIntakeType', name, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Intake Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .edit-intake-type': function(event) {
        event.preventDefault();

        $('#name').val(this.name);
        $('#_id').val(this._id);
        $('#saveBtn').attr('id', 'editBtn');
        $('.modal-compose').modal('toggle');
      },
      'click #editBtn': function(event) {
        event.preventDefault();

        var _id = $('#_id').val();
        var name = $('#name').val();

        Meteor.call('updateIntakeType', _id, name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Intake Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .delete-intake-type': function(event) {
        event.preventDefault();

        var _id = this._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Intake Type!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteIntakeType', _id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal('Deleted!', 'Your Intake Type has been deleted.', 'success');
                  }
                });
            } else {
                swal('Cancelled', 'Your Intake Type is safe :)', 'error');
            }
        });
      }
    });

})();
