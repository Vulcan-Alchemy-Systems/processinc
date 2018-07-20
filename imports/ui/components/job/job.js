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
        var results = Job.find().fetch();
        return results;
      }
    });
})();
