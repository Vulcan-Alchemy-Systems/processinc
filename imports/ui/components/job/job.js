import { Template } from 'meteor/templating';

import './job.html';

(function() {
    'use strict';

    Template.job.onRendered(tableBootgrid);

    function tableBootgrid() {

        if ( !$.fn.bootgrid ) return;

        var ioniconCss = {
            icon: "icon",
            iconColumns: "ion-ios-list-outline",
            iconDown: "ion-chevron-down",
            iconRefresh: "ion-refresh",
            iconSearch: "ion-search",
            iconUp: "ion-chevron-up"
        }

        $('#bootgrid-command').bootgrid({
            css: ioniconCss,
            formatters: {
                commands: function(column, row) {
                    return '<button type="button" class="btn btn-flat btn-sm btn-info" data-row-id="' + row.id + '"><em class="ion-edit"></em></button>' +
                        '<button type="button" class="btn btn-flat btn-sm btn-danger" data-row-id="' + row.id + '"><em class="ion-trash-a"></em></button>';
                }
            }
        });

    }

})();
