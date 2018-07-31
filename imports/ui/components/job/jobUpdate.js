import { Template } from 'meteor/templating';

import './jobUpdate.html';

(function() {
    'use strict';

    // onCreated
    Template.jobUpdate.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;
        this.subscribe('singleJob', id);
      });
    });

    // onRendered
    Template.jobUpdate.onRendered(function() {
      // dates
      $('#start').datepicker({container:'#datepicker-container-1'});

      $('#expectedFinish').datepicker({container:'#datepicker-container-2'});

      $('#finish').datepicker({container:'#datepicker-container-3'});
    });

    // helpers
    Template.jobUpdate.helpers({
      job: function() {
        var id = Router.current().params._id;
        var result = Job.findOne({_id: id});
        return result;
      },

    });

    Template.jobUpdate.events({
      'click #saveBtn': function(event) {
        event.preventDefault();

        var userId = $('#userId').val();
        var name = $('#name').val();
        var description = $('#description').val();
        var start = $('#start').val();
        var expectedFinish = $('#expectedFinish').val();
        var finish = $('#finish').val();
        var status = $('#status').val();
        var id = Router.current().params._id;

        Meteor.call('updateJob', id, userId, name, description, start, expectedFinish, finish, status, function(error, result) {
          if(error) {
            swal('Error', error, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'The Job was saved.',
              type: 'success',
              closeModal: true,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }, function() {
              Meteor.call('createJobHistory', id, 'Job was updated');
              Router.go('/job/'+id+'/view');
            });
          }
        });
      },

    });
})();
