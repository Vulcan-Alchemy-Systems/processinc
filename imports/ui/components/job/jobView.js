import { Template } from 'meteor/templating';

import './jobView.html';

(function() {
    'use strict';

    // onCreated
    Template.jobView.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;
        Session.set('machines', []);

        this.subscribe('singleJob', id);
        this.subscribe('allJobForms', id);
        this.subscribe('allJobHistory', id);
        this.subscribe('allJobProcess', id);
        this.subscribe('allJobDeliverable', id);
        this.subscribe('allJobNotes', id);
        this.subscribe('allIntakeType');
        this.subscribe('allReturnType');
        this.subscribe('allGrowType');
        this.subscribe('allActiveUser');
        this.subscribe('allLocations');
        this.subscribe('allWeightType');
        this.subscribe('allMachines');

      });
    });

    // onRendered
    Template.jobView.onRendered(function() {
      var id = Router.current().params._id;
      Meteor.call('createJobHistory', id, 'Job was viewed');
      $('.clockpicker').clockpicker({

      });

    });

    // helpers
    Template.jobView.helpers({
      job: function() {
        var id = Router.current().params._id;
        var result = Job.findOne({_id: id});
        return result;
      },
      jobForms: function() {
        var id = Router.current().params._id;
        var result = JobForm.find({jobId: id, deleted: false}).fetch();
        return result;
      },
      jobNotes: function() {
        var id = Router.current().params._id;
        var results = JobNote.find({jobId: id, deleted: false}).fetch();
        return results;
      },
      jobHistory: function() {
        var id = Router.current().params._id;
        var result = JobHistory.find({jobId: id, deleted: false}, {skip: 0, limit: 5, sort: {created: -1}}).fetch();
        return result;
      },
      processes: function() {
        var jobId = Router.current().params._id;
        var results = Process.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        return results;
      },
      deliverables: function() {
        var jobId = Router.current().params._id;
        var results = Deliverable.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        return results;
      },
      postblast: function() {
        var jobId = Router.current().params._id;
        var total = 0;

        Process.find({deleted: false, jobId: jobId, name: 'Post Blast'}).map(function(doc) {
          total += parseInt(doc.weight);
        });

        return total;
      },
      crude: function() {
        var jobId = Router.current().params._id;
        var total = 0;

        Process.find({deleted: false, jobId: jobId, name: 'Crude'}).map(function(doc) {
          if(doc.weight) {
            total += parseInt(doc.weight);
          }
        });

        return total;
      },
      yield: function(postblast, crude) {
        var total = 0;
        if(postblast) {
          total = ((crude/postblast) * 100).toFixed(2);
        }
        return total;
      },
      biomass: function() {
        var jobId = Router.current().params._id;
        var total = 0;

        Process.find({deleted: false, jobId: jobId, name: 'Biomass'}).map(function(doc) {
          total += parseInt(doc.weight);
        });

        return total;
      },
      distilate: function() {
        var jobId = Router.current().params._id;
        var total = 0;
        Process.find({deleted: false, jobId: jobId, name: 'Distilate'}).map(function(doc) {
          total += parseInt(doc.weight);
        });
        return total;
      },
      distilateYield: function(crude, distilate) {
        var total = 0;
        if(distilate) {
          total = ((distilate/crude) * 100).toFixed(2);
        }
        return total;
      },
      selectMachines: function() {
        return Session.get('machines');
      }
    });

    // events
    Template.jobView.events({
      // processName
      'change #processName': function(event) {
        event.preventDefault();
        var processName = $('#processName').val();
        $('#processRow').removeClass('hidden');

        switch(processName) {
          case 'First Pass':
          case 'Second Pass':
          case 'Third Pass':
            $('#processStartRow').show();
            $('#processEndRow').show();
            $('#endWeightRow').show();
            $('#finishTxt').show();
            $('#machineRow').show();
            var machines =  Machine.find({deleted: false, type: 'Lab Equipment'}).map(function(values) {
              return  {
                label: values.name,
                value: values._id
              };
            });

            Session.set('machines', machines);
            //;
          break;
          case 'Crude':
            var machines =  Machine.find({deleted: false, type: 'Extraction Equipment'}).map(function(values) {
              return  {
                label: values.name,
                value: values._id
              };
            });

            Session.set('machines', machines);
            $('#processStartRow').hide();
            $('#processEndRow').hide();
            $('#endWeightRow').hide();
            $('#finishTxt').hide();
            $('#machineRow').show();
          break;
          case 'Biomass':
          case 'Post Blast':
          case 'Distilate':
            $('#processStartRow').hide();
            $('#processEndRow').hide();
            $('#endWeightRow').hide();
            $('#finishTxt').hide();
            $('#machineRow').hide();
          break;
        }
        console.log(processName);

      },
      // createNoteBtn
      'click #createNoteBtn': function(event) {
        event.preventDefault();
        $('#createJobNoteModal').modal('toggle');
      },
      // saveJobNoteBtn
      'click #saveJobNoteBtn': function(event) {
        event.preventDefault();

        var jobId =  Router.current().params._id;
        var note = $('#note').val();
        var id = $('#jobNoteId').val();

        if(id) {
          Meteor.call('updateJobNote', id, jobId, note, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Note was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createJobNoteForm').trigger("reset");
                $('#createJobNoteModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Note was saved');
              });
            }
          });
        } else {
          Meteor.call('createJobNote', jobId, note, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Note was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createJobNoteForm').trigger("reset");
                $('#createJobNoteModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Note was saved');
                console.log(result);
              });
            }
          });
        }
      },
      // jobNoteEditBtn
      'click #jobNoteEditBtn': function(event) {
        event.preventDefault();
        var id = this._id;
        var note = this.note;

        $('#note').val(note);
        $('#jobNoteId').val(id);
        $('#createJobNoteModal').modal('toggle');
      },
      // jobNoteDeleteBtn
      'click #jobNoteDeleteBtn': function(event) {
        event.preventDefault();
        var id = this._id;
        var jobId =  Router.current().params._id;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Note!',
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
            Meteor.call('deleteJobNote', id, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Note was deleted.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  // record History
                  Meteor.call('createJobHistory', jobId, 'Job Note was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The Job Note was not deleted', 'error');
          }
        });
      },
      // createProcessBtn
      'click #createProcessBtn': function(event) {
        event.preventDefault();
        $('#processDate').datepicker({container:'#datepickerContainer1'});
        $('.clockpicker').clockpicker({
          placement: 'top',
          align: 'left',
          donetext: 'Done'
        });
        $('#createProcessModal').modal('toggle');
      },
      // createDeliverableBtn
      'click #createDeliverableBtn': function(event) {
        event.preventDefault();
        $('#deliverableDate').datepicker({container:'#datepickerContainer2'});
        $('#createDeliverableModal').modal('toggle');
      },
      // processEditBtn
      'click #processEditBtn': function(event) {
        event.preventDefault();

        $('#processId').val(this._id);
        $('#processName').val(this.name);
        $('#processUser').val(this.userId);
        $('#processDate').val( moment(this.date).format(Meteor.settings.public.shortDate)) ;
        $('#processWeight').val(this.weight);

        $('#createProcessModal').modal('toggle');
      },
      // processDeleteBtn
      'click #processDeleteBtn': function(event) {
        event.preventDefault();
        var id = this._id;
        var jobId =  Router.current().params._id;
        var name = this.name;
        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Process!',
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
            Meteor.call('deleteProcess', id, function(error, result) {
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
                  Meteor.call('createJobHistory', jobId, 'Job Process '+name+' was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The Job Process was not deleted', 'error');
          }
        });
      },

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

      // saveProcessBtn
      'click #saveProcessBtn': function(event) {
        event.preventDefault();

        var jobId =  Router.current().params._id;
        var name = $('#processName').val();
        var date = $('#processDate').val();
        var start = $('#processStart').val();
        var end = $('#processEnd').val();
        var userId = $('#processUser').val();
        var endWeight = $('#endWeight').val();
        var weight = $('#processWeight').val();
        var machine = $('#processMachine').val();
        var id = $('#processId').val();

        if(id) {
          Meteor.call('updateProcess', id, jobId, name, date, userId, weight, start, end, endWeight, machine, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Process was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createProcessForm').trigger("reset");
                $('#createProcessModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Process '+name+' was updated');
              });
            }
          });
        } else {
          Meteor.call('createProcess', jobId, name, date, userId, weight, function(error, result) {
            if(error) {
              swal('Error', error, 'error');
            } else {
              swal({
                title: 'Success',
                text: 'The Process was saved.',
                type: 'success',
                closeModal: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
              }, function() {
                $('#createProcessForm').trigger("reset");
                $('#createProcessModal').modal('toggle');
                Meteor.call('createJobHistory', jobId, 'Process '+name+' added to job');
              });
            }
          });
        }
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
      // viewJobForm
      'click #viewJobForm': function(event) {
        event.preventDefault();

        var intakeTypeName = IntakeType.findOne({_id: this.intakeType}).name;
        var returnType = ReturnType.findOne({_id: this.returnType}).name;
        var growType = GrowType.findOne({_id: this.growType}).name;

        var createdBy = Meteor.users.findOne({_id: this.createdBy}, {fields: {emails: 1}});
        createdBy = createdBy.emails[0].address;

        var created = moment(this.created).format(Meteor.settings.public.longDate);
        var strain = this.strain;
        var condition = this.condition;
        if(this.labTested === 'true') { var labTested = 'Yes' } else { var labTested = 'No'}
        if(this.labSheetProvided === 'true') {var labSheetProvided = 'Yes'} else {var labSheetProvided = 'No'}
        if(this.trackingEnabled === 'true') {var trackingEnabled = 'Yes'} else {var trackingEnabled = 'No'}
        if(this.prerocessing === 'true') {var prerocessing = 'Yes'} else {var prerocessing = 'No'}


        $('#intakeType').html(intakeTypeName);
        $('#created').html(created);
        $('#createdBy').html(createdBy);
        $('#growType').html(growType);
        $('#strain').html(strain);
        $('#condition').html(condition);
        $('#labTested').html(labTested);
        $('#labSheetProvided').html(labSheetProvided);
        $('#trackingEnabled').html(trackingEnabled);
        $('#prerocessing').html(prerocessing);
        $('#returnType').html(returnType);

        var biomassWeightKilos = (this.biomassWeight / 1000).toFixed(2);
        var biomassWeightGrams = (this.biomassWeight * 1).toFixed(2);
        var biomassWeightOunces = ((this.biomassWeight / 454) * 16).toFixed(2);
        var biomassWeightPounds = (this.biomassWeight / 454).toFixed(2);
        var biomassWeightTons = ((this.biomassWeight / 454) / 2000).toFixed(4);

        var containerWeightKilos = (this.containerWeight / 1000).toFixed(2);
        var containerWeightGrams = (this.containerWeight * 1).toFixed(2);
        var containerWeightOunces = ((this.containerWeight / 454) * 16).toFixed(2);
        var containerWeightPounds = (this.containerWeight / 454).toFixed(2);
        var containerWeightTons = ((this.containerWeight / 454) / 2000).toFixed(4);

        var netKilos = (biomassWeightKilos - containerWeightKilos).toFixed(2);
        var netGrams = (biomassWeightGrams - containerWeightGrams).toFixed(2);
        var netOunces = (biomassWeightOunces - containerWeightOunces).toFixed(2);
        var netPounds = (biomassWeightPounds - containerWeightPounds).toFixed(2);
        var netTons = (biomassWeightTons - containerWeightTons).toFixed(4);

        var yieldKilos = (netKilos * .05).toFixed(2);
        var yieldGrams = (netGrams * .05).toFixed(2);
        var yieldOunces = (netOunces * .05).toFixed(2);
        var yieldPounds = (netPounds * .05).toFixed(2);
        var yieldTons = (netTons * .05).toFixed(4);

        $('#kilos').html(biomassWeightKilos);
        $('#grams').html(biomassWeightGrams);
        $('#ounces').html(biomassWeightOunces);
        $('#pounds').html(biomassWeightPounds);
        $('#tons').html(biomassWeightTons);

        $('#containerKilos').html(containerWeightKilos);
        $('#containerGrams').html(containerWeightGrams);
        $('#containerOunces').html(containerWeightOunces);
        $('#containerPounds').html(containerWeightPounds);
        $('#containerTons').html(containerWeightTons);

        $('#netKilos').html(netKilos);
        $('#netGrams').html(netGrams);
        $('#netOunces').html(netOunces);
        $('#netPounds').html(netPounds);
        $('#netTons').html(netTons);

        $('#yieldKilos').html(yieldKilos);
        $('#yieldGrams').html(yieldGrams);
        $('#yieldOunces').html(yieldOunces);
        $('#yieldPounds').html(yieldPounds);
        $('#yieldTons').html(yieldTons);

        // toggle
        $('#jobFormModal').modal('toggle');
      },
      // deleteJobForm
      'click #jobFormDelete': function(event) {
        event.preventDefault();

        var jobId = Router.current().params._id;
        var jobFormId = this._id;

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Job Form!',
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
            Meteor.call('deleteJobForm', jobFormId, function(error, result) {
              if(error) {
                swal('Error', error, 'error');
              } else {
                swal({
                  title: 'Success',
                  text: 'The Job was deleted.',
                  type: 'success',
                  closeModal: true,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }, function() {
                  // record History
                  Meteor.call('createJobHistory', jobId, 'Job Form was deleted');
                });
              }
            });
          } else {
            swal('Cancelled', 'The Job Form was not deleted', 'error');
          }
        });

      },

      // jobFormEdit
      'click #jobFormEdit': function(event) {
        event.preventDefault();

        var jobId = Router.current().params._id;
        var jobFormId = this._id;
        Router.go('/job/' + jobId + '/form/' + jobFormId + '/edit');
      },

      // deleteJob
      'click #deleteJobBtn': function(event) {
        event.preventDefault();

        var id = Router.current().params._id;

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Job!',
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
                Meteor.call('deleteJob', id, function(error, result) {
                  if(error) {
                    swal('Error', error, 'error');
                  } else {
                    swal({
                      title: 'Success',
                      text: 'The Job was deleted.',
                      type: 'success',
                      closeModal: true,
                      closeOnClickOutside: false,
                      closeOnEsc: false,
                    }, function() {
                      // record History
                      Meteor.call('createJobHistory', id, 'Job was deleted');
                      Router.go('/job');
                    });
                  }
                });
            } else {
                swal('Cancelled', 'The Job was not deleted', 'error');
            }
        });
      }
    });
})();
