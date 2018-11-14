import { Template } from 'meteor/templating';

import './jobProcess.html';

(function() {
    'use strict';

    // onCreated
    Template.jobProcess.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('allJobProcess', jobId);
        this.subscribe('allActiveUser');
      });
    });

    // onRendered
    Template.jobProcess.onRendered(function() {});

    // helpers
    Template.jobProcess.helpers({
      processes: function() {
        var jobId = Router.current().params._id;
        var results = Process.find({deleted: false, jobId: jobId}, {sort: {date: 1}}).fetch();
        return results;
      },
    });
})();
