import { Template } from 'meteor/templating';

import './jobView.html';

(function() {
    'use strict';

    // onCreated
    Template.jobView.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params._id;
        this.subscribe('singleJob', id);
      });
    });

    // onRendered
    Template.jobView.onRendered(function() {

    });

    // helpers
    Template.jobView.helpers({
      job: function() {
        var id = Router.current().params._id;
        var result = Job.findOne({_id: id});
        return result;
      }
    });

    // events
    Template.jobView.events({

    });
})();
