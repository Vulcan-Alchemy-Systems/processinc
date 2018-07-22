import { Template } from 'meteor/templating';

import './job.html';

(function() {
    'use strict';

    // on created
    Template.job.onCreated(function() {
      this.autorun(() => {
        // subscribe
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
})();
