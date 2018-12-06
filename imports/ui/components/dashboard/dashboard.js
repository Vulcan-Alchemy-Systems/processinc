import { Template } from 'meteor/templating';

import './dashboard.html';

(function() {
    'use strict';

    // onCreated
    Template.dashboard.onCreated(function() {
      this.autorun(() => {
        this.subscribe('allExtractionProcess');
        this.subscribe('allDistillationProcess');
        this.subscribe('allJobs');
        this.subscribe('allDeliverable');
        this.subscribe('allActiveUser');
      });
    });

    Template.dashboard.onRendered(initDashboard);

    // helpers
    Template.dashboard.helpers({
      jobs: function() {
        var results = Job.find({deleted: false}).fetch();
        return results;
      },
      deliverables: function() {
        var results = Deliverable.find({deleted: false, delivered: false}).fetch();
        return results;
      }
    });

    function initDashboard() {

        var lineOptions = {
            series: {
                lines: {
                    show: true,
                    fill: 0.01
                },
                points: {
                    show: true,
                    radius: 4
                }
            },
            grid: {
                borderColor: 'rgba(162,162,162,.26)',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: 'transparent'
            },
            tooltip: false,
            tooltipOpts: {
                content: function(label, x, y) {
                    return x + ' : ' + y;
                }
            },
            xaxis: {
                tickColor: 'rgba(162,162,162,.26)',
                font: {
                    color: Colors.byName('blueGrey-200')
                },
                mode: 'categories'
            },
            yaxis: {
                // position: (isRTL ? 'right' : 'left'),
                tickColor: 'rgba(162,162,162,.26)',
                font: {
                    color: Colors.byName('blueGrey-200')
                }
            },
            shadowSize: 0
        };

        var crudeData = getCrudeData();
        var stillOneData = getStillOneData();
        var stillTwoData = getStillTwoData();
        var stillThreeData = getStillThreeData();
        var stillFourData = getStillFourData();

        update();

        function getStillOneData() {
          var stillOne = DistillationProcess.find({deleted: false, pass: "First", machine: "avoXSWh9xkLiwuFrq"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.amountEnd];
          });
          var realTimeData = [{
              "color": "#00BCD4",
              "data": stillOne
          }];

          return realTimeData;
        }

        function getStillTwoData() {
          var stillTwo = DistillationProcess.find({deleted: false, pass: "First", machine: "2nXo7NYXLEjaFaCTe"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.amountEnd];
          });
          var realTimeData = [{
              "color": "#00BCD4",
              "data": stillTwo
          }];

          return realTimeData;
        }

        function getStillThreeData() {
          var stillTree = DistillationProcess.find({deleted: false, pass: "Second", machine: "8dQqz53Lpg7jf2tDG"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.amountEnd];
          });

          var realTimeData = [{
              "color": "#CDDC39",
              "data": stillTree
          }];

          return realTimeData;
        }

        function getStillFourData() {
          var stillFour = DistillationProcess.find({deleted: false, pass: "Second", machine: "5GPTNXqHG5NThiq5J"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.amountEnd];
          });

          var realTimeData = [{
              "color": "#CDDC39",
              "data": stillFour
          }];

          return realTimeData;
        }

        // getCrudeData
        function getCrudeData() {
          var firstShift =  ExtractionProcess.find({deleted: false, shift: "First"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.crude];
          });

          var secondShift =  ExtractionProcess.find({deleted: false, shift: "Second"}, {skip: 0, limit: 10, sort: {date: 1}}).map(function(values) {
            return [moment(values.date).format(Meteor.settings.public.shortDate), values.crude];
          });

          var realTimeData = [{
              "label": "First Shift",
              "color": "#00BCD4",
              "data": firstShift
          }, {
              "label": "Second Shift",
              "color": "#CDDC39",
              "data": secondShift
          }];

          return realTimeData;
        }

        function update() {
          crudeData = getCrudeData();
          stillOneData = getStillOneData();
          stillTwoData = getStillTwoData();
          stillThreeData = getStillThreeData();
          stillFourData = getStillFourData();

          $('#extraction-flotchart').plot(crudeData, lineOptions);
          $('#still-one-flotchart').plot(stillOneData, lineOptions);
          $('#still-two-pass-flotchart').plot(stillTwoData, lineOptions);
          $('#still-three-pass-flotchart').plot(stillThreeData, lineOptions);
          $('#still-four-pass-flotchart').plot(stillFourData, lineOptions);

          setTimeout(update, 60);
        }

    }
})();
