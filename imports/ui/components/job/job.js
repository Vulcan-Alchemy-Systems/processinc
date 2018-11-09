import { Template } from 'meteor/templating';

import './job.html';

(function() {
    'use strict';

    // on created
    Template.job.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allJobs');
      });
    });

    // on rendered
    Template.job.onRendered(function() {});

    // helpers
    Template.job.helpers({
      jobs: function() {
        var results = Job.find({deleted: false}).fetch();
        return results;
      }
    });

    // jobStatusSelectList
    Template.registerHelper('jobStatusSelectList', function (userId) {
      return [{
          label: 'New',
          value: 'New'
        },{
          label: 'In Process',
          value:'In Process'
        },{
          label: 'On Hold',
          value: 'On Hold'
        },{
          label: 'Completed',
          value: 'Completed'
        },{
          label: 'Canceled',
          value: 'Canceled'
        }];
    });

    // jobName
    Template.registerHelper('jobName', function (jobId) {
      var result = Job.findOne({_id: jobId});
      var jobName = result.name;
      return jobName;
    });
})();
