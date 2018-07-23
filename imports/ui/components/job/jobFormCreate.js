import { Template } from 'meteor/templating';

import './jobFormCreate.html';

(function() {
    'use strict';

    // on created
    Template.jobFormCreate.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allIntakeType');
        this.subscribe('allGrowType');
        this.subscribe('allReturnType');
      });
    });

    // onRendered
    Template.jobFormCreate.onRendered(function() {

    });

    // helpers
    Template.jobFormCreate.helpers({

    });

    // events
    Template.jobFormCreate.events({
      'change #intakeType': function(event) {
        var intakeType = $('#intakeType').val();

        console.log(intakeType);

        switch(intakeType) {
          case 'u4A2hsx2k9apWWmCv':
            $('#u4A2hsx2k9apWWmCv').removeClass('hidden');
          break;
          case 'wuwLti2ZhQBvJGWDb':
            $('#wuwLti2ZhQBvJGWDb').removeClass('hidden');
            $('#u4A2hsx2k9apWWmCv').addClass('hidden');
          break;
          defult:
            $('#u4A2hsx2k9apWWmCv').addClass('hidden');
        }
      }
    });
})();
