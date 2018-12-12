import { Template } from 'meteor/templating';

import './inventoryPrint.html';

(function() {
    'use strict';

    // on created
    Template.inventoryPrint.onCreated(function() {
      this.autorun(() => {
        var id = Router.current().params.id;
        this.subscribe('singleDeliverable', id);
      });
    });

    // on rendered
    Template.inventoryPrint.onRendered(onRendered);

    // helpers
    Template.inventoryPrint.helpers({
      deliverable: function() {
        var id = Router.current().params.id;
        console.log(id)
        var result = Deliverable.findOne({_id: id});
        console.log(result)
        return result;
      }
    });

    // onRendered
    function onRendered() {

    }
})();
