import { Template } from 'meteor/templating';

import './core.layout.html';
import './core.print.html';

Template.layout.onRendered(() => {

    // Set default theme
    $('body').addClass('theme-1');

});
