import { Template } from 'meteor/templating';

import './jobHistory.html';

(function() {
    'use strict';

    // onCreated
    Template.jobHistory.onCreated(function() {
      this.autorun(() => {
        var jobId = Router.current().params._id;
        this.subscribe('allJobHistory', jobId);
      });
    });

    // onRendered
    Template.jobHistory.onRendered(function() {});

    // helpers
    Template.jobHistory.helpers({
      jobHistory: function() {
        var id = Router.current().params._id;
        var result = JobHistory.find({jobId: id, deleted: false}, {sort: {created: -1}}).fetch();
        return result;
      },
    });

})();
