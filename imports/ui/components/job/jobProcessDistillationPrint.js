import { Template } from 'meteor/templating';

import './jobProcessDistillationPrint.html';

(function() {
    'use strict';

    // onCreated
    Template.jobProcessDistillationPrint.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('singleJob', jobId);
        this.subscribe('allJobDistillationProcess', jobId);
        this.subscribe('allActiveUser');
        this.subscribe('allMachines');
        Session.set('machines', []);
        Session.set('totalFirstPass', 0);
        Session.set('totalSecondPass', 0);
        Session.set('distillationProcess', []);
      });
    });

    // onRendered
    Template.jobProcessDistillationPrint.onRendered(function() {});

    // helpers
    Template.jobProcessDistillationPrint.helpers({
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
        return total;
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
        return total;
      },
    });
})();
