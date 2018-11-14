import { Template } from 'meteor/templating';

import './jobExtractionProcess.html';

(function() {
    'use strict';

    // onCreated
    Template.jobExtractionProcess.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('singleJob', jobId);
        this.subscribe('allJobExtractionProcess', jobId);
        this.subscribe('allActiveUser');
        this.subscribe('allMachines');
        Session.set('machines', []);
        Session.set('totalPostBlast', 0);
        Session.set('totalCrude', 0);
      });
    });

    // onRendered
    Template.jobExtractionProcess.onRendered(function() {});

    // helpers
    Template.jobExtractionProcess.helpers({
      job: function() {
        var jobId = Router.current().params._id;
        var result = Job.findOne({_id: jobId});
        return result;
      },
      extractionProcess: function() {
        var jobId = Router.current().params._id;
        var results = ExtractionProcess.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        console.log(results);
        return results;
      },
      selectMachines: function() {
        return Session.get('machines');
      },
      totalPostBlast: function() {
        var jobId = Router.current().params._id;
        var total = 0;

        ExtractionProcess.find({deleted: false, jobId: jobId}).map(function(doc) {
          total += parseInt(doc.postBlast);
        });
        Session.set('totalPostBlast', total);
        return total;
      },
      totalCrude: function() {
        var jobId = Router.current().params._id;
        var total = 0;

        ExtractionProcess.find({deleted: false, jobId: jobId}).map(function(doc) {
          total += parseInt(doc.crude);
        });
        Session.set('totalCrude', total);
        return total;
      },
      totalYield: function() {
        var postBlast = Session.get('totalPostBlast');
        var crude = Session.get('totalCrude')
        var total = ((crude/postBlast) * 100).toFixed(2);
        return total;
      }
    });

    // events
    Template.jobExtractionProcess.events({
      // createExtractionProcessBtn
      'click #createExtractionProcessBtn': function(event) {
        event.preventDefault();
        var machines =  Machine.find({deleted: false, type: 'Extraction Equipment'}).map(function(values) {
          return  {
            label: values.name,
            value: values._id
          };
        });
        Session.set('machines', machines);
        $('#extractionProcessDate').datepicker({container:'#extractionProcessDateContainer', autoclose: true});
        $('#createExtractionProcessModal').modal('toggle');
      },

      // saveExtractionProcessBtn
      'click #saveExtractionProcessBtn': function(event) {
        event.preventDefault();
        var id = $('#extractionProcessId').val();
        var jobId = Router.current().params._id;
        var date = $('#extractionProcessDate').val();
        var shift = $('#extractionProcessShift').val();
        var userId = $('#extractionProcessUser').val();
        var postBlast = $('#extractionProcessPostBlast').val();
        var crude = $('#extractionProcessCrude').val();
        var extractionYield = ((crude/postBlast) * 100).toFixed(2);
        var machine = $('#extractionProcessMachine').val();
        var note = $('extractionProcessNote').val();

        if(id) {
          Meteor.call('updateProcessExtraction', id, jobId, date, shift, userId, postBlast, crude, extractionYield, machine, note, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Extraction Process was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createExtractionProcessForm').trigger("reset");
                $('#createExtractionProcessModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Extraction Process was saved');
              });
            }
          });
        } else {
          Meteor.call('createProcessExtraction', jobId, date, shift, userId, postBlast, crude, extractionYield, machine, note, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Extraction Process was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createExtractionProcessForm').trigger("reset");
                $('#createExtractionProcessModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Extraction Process was saved');
              });
            }
          });
        }
      },

      // extractionProcessEditBtn
      'click #extractionProcessEditBtn': function(event) {
          event.preventDefault();
          var machines =  Machine.find({deleted: false, type: 'Extraction Equipment'}).map(function(values) {
            return  {
              label: values.name,
              value: values._id
            };
          });
          Session.set('machines', machines);

          var id = this._id;
          $('#extractionProcessDate').val( moment(this.date).format(Meteor.settings.public.shortDate));
          $('#extractionProcessShift').val(this.shift);
          $('#extractionProcessUser').val(this.userId);
          $('#extractionProcessPostBlast').val(this.postBlast);
          $('#extractionProcessCrude').val(this.crude);
          $('#extractionProcessMachine').val(this.machine);
          $('#extractionProcessId').val(id);
          console.log(id);
          $('#createExtractionProcessModal').modal('toggle');
      },

      // extractionProcessDeleteBtn
      'click #extractionProcessDeleteBtn': function(event) {
        event.preventDefault();
        var id = this._id;
        var jobId = Router.current().params._id;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this process!',
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
            Meteor.call('deleteProcessExtraction', id, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Process was deleted.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  // record History
                  Meteor.call('createJobHistory', jobId, 'Extraction Process was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The process was not deleted', 'error');
          }
        });
      },
    });
})();
