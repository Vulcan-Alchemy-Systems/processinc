import { Template } from 'meteor/templating';

import './inventory.html';

(function() {
    'use strict';

    // on created
    Template.inventory.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allDeliverable');
        this.subscribe('allJobs');
        this.balance = new ReactiveVar(0);
      });
    });

    // on rendered
    Template.inventory.onRendered(function() {});

    // helpers
    Template.inventory.helpers({
      deliverables: function() {
        var result = Deliverable.find({}, {sort: {created: 1}}).fetch();
        return result;
      },
      in: function(weight, delivered) {
        if(! delivered) {
          var balance = Template.instance().balance.get();
          var newBalance =  parseFloat(weight) + balance;
          //Template.instance().balance.set(newBalance);
        }
        return weight;
      },
      out: function(weight, delivered) {
        if(delivered) {
          var balance = Template.instance().balance.get();
          var newBalance = balance - parseFloat(weight)
          Template.instance().balance.set(newBalance);
          return weight;
        } else {
          return 0;
        }
      },
      balance: function(weight) {
        var balance = Template.instance().balance.get();
        return balance;
      }
    });

    // events
    Template.inventory.events({

    });
})();
