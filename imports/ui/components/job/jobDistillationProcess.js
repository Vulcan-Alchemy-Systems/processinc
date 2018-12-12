import { Template } from 'meteor/templating';

import './jobDistillationProcess.html';

(function() {
    'use strict';

    // onCreated
    Template.jobDistillationProcess.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('singleJob', jobId);
        this.subscribe('allJobDistillationProcess', jobId);
        this.subscribe('allActiveUser');
        this.subscribe('allMachines');
        Session.set('machines', []);
      });
    });

    // onRendered
    Template.jobDistillationProcess.onRendered(function() {});

    // helpers
    Template.jobDistillationProcess.helpers({
      job: function() {
        var jobId = Router.current().params._id;
        var result = Job.findOne({_id: jobId});
        return result;
      },
      distillationProcess: function() {
        var jobId = Router.current().params._id;
        var results = DistillationProcess.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        Session.set('distillationProcess', results);
        return results;
      },
      selectMachines: function() {
        return Session.get('machines');
      },
      processYield: function(start, finish) {
          var total = 0;
          if(start && finish) {
            total = ((finish/start) * 100).toFixed(2);
          }
          return total;
      },
      totalStartFirstPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "First") {
              total = total + process.amountStart;
            }
          });
        }
        return total;
      },
      totalFinishFirstPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "First") {
              total = total + process.amountEnd;
            }
          });
        }
        return total;
      },
      totalRunTImeFirstPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "First") {
              var timeStr = process.runStart;
              timeStr = timeStr.split(':');
              var startH = parseInt(timeStr[0]);
              var startM = (parseInt(timeStr[1]) / 60);

              var timeStr = process.runEnd;
              timeStr = timeStr.split(':');
              var endH = parseInt(timeStr[0]);
              var endM = (parseInt(timeStr[1]) / 60);

              var runTime = (endH + endM).toFixed(2) - (startH + startM).toFixed(2);
              total = total + runTime;
            }
          });
        }
        return total.toFixed(2);
      },
      totalStartSecondPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "Second") {
              total = total + process.amountStart;
            }
          });
        }
        return total;
      },
      totalFinishSecondPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "Second") {
              total = total + process.amountEnd;
            }
          });
        }
        return total;
      },
      totalRunTImeSecondPass: function() {
        var result = Session.get('distillationProcess');
        var total = 0;
        if(result) {
          $.each(result, function(key, process) {
            if(process.pass == "Second") {
              var timeStr = process.runStart;
              timeStr = timeStr.split(':');
              var startH = parseInt(timeStr[0]);
              var startM = (parseInt(timeStr[1]) / 60);

              var timeStr = process.runEnd;
              timeStr = timeStr.split(':');
              var endH = parseInt(timeStr[0]);
              var endM = (parseInt(timeStr[1]) / 60);

              var runTime = (endH + endM).toFixed(2) - (startH + startM).toFixed(2);
              total = total + runTime;
            }
          });
        }
        return total.toFixed(2);
      },
    });

    // events
    Template.jobDistillationProcess.events({
      // createDistillationProcessBtn
      'click #createDistillationProcessBtn': function(event) {
        event.preventDefault();
        $('#distillationProcessId').val(null);
        var id = $('#distillationProcessId').val();
        $('.clockpicker').clockpicker({});
        console.log(id);

        var machines =  Machine.find({deleted: false, type: 'Lab Equipment'}).map(function(values) {
          return  {
            label: values.name,
            value: values._id
          };
        });
        Session.set('machines', machines);
        $('#distillationProcessDate').datepicker({container:'#distillationProcessDateContainer', autoclose: true});
        $('#createDistillationProcessModal').modal('toggle');
      },

      // saveDistillationProcessBtn
      'click #saveDistillationProcessBtn': function(event) {
          event.preventDefault();
          var jobId = Router.current().params._id;
          var id = $('#distillationProcessId').val();
          var date = $('#distillationProcessDate').val();
          var shift = $('#distillationProcessShift').val();
          var userId = $('#distillationProcessUser').val();
          var pass = $('#distillationProcessPass').val();
          var runStart = $('#distillationProcessRunStart').val();
          var runEnd = $('#distillationProcessRunEnd').val();
          var amountStart = $('#distillationProcessAmountStart').val();
          var amountEnd = $('#distillationProcessAmountEnd').val();
          var machine = $('#distillationProcessMachine').val();
          var note = $('#distillationProcessNote').val();
          console.log(id);

          if(id) {
            Meteor.call('updateDistillationProcess', id, jobId, date, shift, userId, pass, runStart, runEnd, amountStart, amountEnd, machine, note, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Distillation Process was updated.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  $('#createDistillationProcessForm').trigger("reset");
                  $('#createDistillationProcessModal').modal('toggle');
                  Meteor.call('createJobHistory', jobId, 'Distillation Process was saved');
                });
              }
            });
          } else {
            Meteor.call('createDistillationProcess', jobId, date, shift, userId, pass, runStart, runEnd, amountStart, amountEnd, machine, note, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Distillation Process was created.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  $('#createDistillationProcessForm').trigger("reset");
                  $('#createDistillationProcessModal').modal('toggle');
                  Meteor.call('createJobHistory', jobId, 'Distillation Process was saved');
                });
              }
            });
          }

      },

      // distillationProcessEditBtn
      'click #distillationProcessEditBtn': function(event) {
        event.preventDefault();
        var machines =  Machine.find({deleted: false, type: 'Lab Equipment'}).map(function(values) {
          return  {
            label: values.name,
            value: values._id
          };
        });
        Session.set('machines', machines);

        $('#distillationProcessDate').datepicker({container:'#distillationProcessDateContainer', autoclose: true});

        $('#distillationProcessId').val(this._id);
        $('#distillationProcessDate').val(moment(this.date).format(Meteor.settings.public.shortDate));
        $('#distillationProcessShift').val(this.shift);
        $('#distillationProcessPass').val(this.pass);
        $('#distillationProcessRunStart').val(this.runStart);
        $('#distillationProcessRunEnd').val(this.runEnd);
        $('#distillationProcessAmountStart').val(this.amountStart);
        $('#distillationProcessAmountEnd').val(this.amountEnd);
        $('#distillationProcessMachine').val(this.machine);
        $('#distillationProcessNote').val(this.note);

        $('#createDistillationProcessModal').modal('toggle');
      },

      // distillationProcessDeleteBtn
      'click #distillationProcessDeleteBtn': function() {
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
            Meteor.call('deleteDistillationProcess', id, function(error, result) {
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
                  Meteor.call('createJobHistory', jobId, 'Distillation Process was deleted');
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
