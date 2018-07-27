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
          // distilate
          case 'u4A2hsx2k9apWWmCv':
          case 'wuwLti2ZhQBvJGWDb':
            $('#distilate').removeClass('hidden');
          break;
          // shatter
          case 'ArgLwXYcrRWFFC7cX':
          case 'eEu47ZGp3Ae4ttnek':
            $('#shatter').removeClass('hidden');
            $('#distilate').addClass('hidden');
          break;
          //cart formr
          case 'ymuvhtv6AXQYwWCvP':
            $('#distilate').addClass('hidden');
            $('#shatter').addClass('hidden');
          break;
        }
      }
    });
})();
