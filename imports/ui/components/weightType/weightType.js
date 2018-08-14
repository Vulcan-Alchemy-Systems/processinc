import { Template } from 'meteor/templating';

import './weightType.html';

(function() {
    'use strict';

    // onCreated
    Template.weightType.onCreated(function() {
      this.autorun(() => {
        // subscribe
        this.subscribe('allWeightType');
      });
    });

    // onRendered
    Template.weightType.onRendered(function() {});

    // helpers
    Template.weightType.helpers({
      weightTypes: function() {
        var results = WeightType.find().fetch();
        return results;
      }
    });

    // userSelectList
    Template.registerHelper('weightTypeSelectList', function (userId) {
      return WeightType.find().map(function(values) {
        return {
          label: values.name,
          value: values._id
        };
      });
    });

    Template.registerHelper('weightTypeName', function (id) {
      var result = WeightType.findOne({_id: id});

      if(result) {
        return result.name
      } else {
        return 'Unknown';
      }
    });

    // events
    Template.weightType.events({
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

        Meteor.call('createWeightType', name, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Weight Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .edit-weight-type': function(event) {
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

        Meteor.call('updateWeightType', _id, name, function(error, result){
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal('Success', 'Weight Type was saved', 'success');
            $('.modal-compose').modal('toggle');
          }
        });
      },
      'click .delete-weight-type': function(event) {
        event.preventDefault();

        var _id = this._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Weight Type!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                Meteor.call('deleteWeightType', _id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal('Deleted!', 'Your Weight Type has been deleted.', 'success');
                  }
                });
            }
        });
      }
    });
})();
