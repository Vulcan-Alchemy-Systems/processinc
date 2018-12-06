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
        return results;
      },
    });
})();
