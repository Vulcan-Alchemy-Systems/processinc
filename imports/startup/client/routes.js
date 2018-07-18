Router.configure({
    layoutTemplate: 'layout'
        // loadingTemplate: 'loading'
});

// Default route
Router.route('/', function() {
    Router.go('dashboard');
});

// Dashboard
Router.route('dashboard', {
    template : 'Dashboard',
    title : 'Dashboard'
});

Router.route('job', {
    template : 'job',
    title : 'Jobs'
});

Router.route('job/create/:_id', {
    template : 'jobCreate',
    title : 'New Job',
    name: 'jobCreate'
});

Router.route('role', {
    template : 'role',
    title : 'Roles',
    name: 'role'
});

// admin
Router.route('admin', {
    template : 'admin',
    title : 'Admin'
});

Router.route('grow-type', {
    template : 'growType',
    title : 'Grow Types'
});

Router.route('intake-type', {
    template : 'intakeType',
    title : 'Intake Types'
});

Router.route('return-type', {
    template : 'returnType',
    title : 'Return Types'
});

Router.route('weight-type', {
    template : 'weightType',
    title : 'Weight Types'
});

Router.route('user', {
    template : 'user',
    title : 'Users'
});

Router.route('user/create', {
    template: 'userCreate',
    title: 'New User',
    name: 'userCreate'
});

Router.route('user/view/:_id', {
    template: 'userView',
    title: 'View User',
    name: 'userView'
});

// Cards
Router.route('cards', {
    template : 'Cards',
    title : 'Cards'
});

// Charts
Router.map(function() {
    this.route('chart-flot', {
        template: 'chartsFlot',
        title: 'Charts Flot'
    });
    this.route('chart-radial', {
        template: 'chartsRadial',
        title: 'Charts Radial'
    });
    this.route('chart-rickshaw', {
        template: 'chartsRickshaw',
        title: 'Charts Rickshaw'
    });
});

// Forms
Router.map(function() {
    this.route('form-classic', {
        template: 'classicInputs',
        title: 'Classic Inputs'
    });
    this.route('form-advanced', {
        template: 'formsAdvanced',
        title: 'Forms Advanced'
    });
    this.route('form-validation', {
        template: 'formsValidation',
        title: 'Forms Validation'
    });
    this.route('form-material', {
        template: 'materialInputs',
        title: 'Material Inputs'
    });
    this.route('form-editor', {
        template: 'formsEditor',
        title: 'Forms Editor'
    });
    this.route('form-upload', {
        template: 'formUpload',
        title: 'Form Upload'
    });
    this.route('form-xeditable', {
        template: 'XEditable',
        title: 'XEditable'
    });
    this.route('form-wizard', {
        template: 'wizard',
        title: 'Wizard'
    });
});

// Tables
Router.map(function() {
    this.route('table-classic', {
        template: 'classicTables',
        title: 'Classic Tables'
    });
    this.route('table-datatables', {
        template: 'datatables',
        title: 'Datatables'
    });
    this.route('table-bootgrid', {
        template: 'bootgrid',
        title: 'Bootgrid'
    });
});

// Layouts
Router.map(function() {
    this.route('layout-boxed', {
        template: 'boxedLayout',
        title: 'Boxed Layout'
    });
    this.route('layout-columns', {
        template: 'columnsLayout',
        title: 'Columns Layout'
    });
    this.route('layout-containers', {
        template: 'containers',
        title: 'Containers'
    });
    this.route('layout-overlap', {
        template: 'overlapLayout',
        title: 'Overlap Layout'
    });
    this.route('layout-tabs', {
        template: 'tabsLayout',
        title: 'Tabs Layout'
    });
});

// Elements
Router.map(function() {
    this.route('bootstrap', {
        template: 'bootstrap',
        title: 'Bootstrap'
    });
    this.route('buttons', {
        template: 'buttons',
        title: 'Buttons'
    });
    this.route('colors', {
        template: 'colors',
        title: 'Colors'
    });
    this.route('grid-masonry', {
        template: 'gridMasonry',
        title: 'Grid Masonry'
    });
    this.route('bsgrid', {
        template: 'grid',
        title: 'Grid'
    });
    this.route('icons', {
        template: 'icons',
        title: 'Icons'
    });
    this.route('lists', {
        template: 'lists',
        title: 'Lists'
    });
    this.route('nestable', {
        template: 'nestable',
        title: 'Nestable'
    });
    this.route('spinners', {
        template: 'spinners',
        title: 'Spinners'
    });
    this.route('sweetalert', {
        template: 'sweetalert',
        title: 'Sweetalert'
    });
    this.route('typography', {
        template: 'typography',
        title: 'Typography'
    });
    this.route('utilities', {
        template: 'utilities',
        title: 'Utilities'
    });
    this.route('whiteframes', {
        template: 'whiteframes',
        title: 'Whiteframes'
    });
});

// Maps
Router.map(function() {
    this.route('google-map-full', {
        template: 'fullsizeGoogleMaps',
        title: 'Fullsize GoogleMaps'
    });
    this.route('google-map', {
        template: 'googleMaps',
        title: 'Google Maps'
    });
    this.route('vector-map', {
        template: 'vectorMaps',
        title: 'Vector Maps'
    });
    this.route('datamaps', {
        template: 'datamaps',
        title: 'Datamaps'
    });
});

// Pages
Router.map(function() {
    this.route('timeline', {
        template: 'timeline',
        title: 'Timeline'
    });
    this.route('invoice', {
        template: 'invoice',
        title: 'Invoice'
    });
    this.route('pricing', {
        template: 'pricing',
        title: 'Pricing'
    });
    this.route('contacts', {
        template: 'contacts',
        title: 'Contacts'
    });
    this.route('faq', {
        template: 'faq',
        title: 'Faq'
    });
    this.route('projects', {
        template: 'projects',
        title: 'Projects'
    });
    this.route('blog', {
        template: 'blog',
        title: 'Blog'
    });
    this.route('blog-article', {
        template: 'blogArticle',
        title: 'Blog Article'
    });
    this.route('gallery', {
        template: 'gallery',
        title: 'Gallery'
    });
    this.route('messages-board', {
        template: 'messagesBoard',
        title: 'Messages Board'
    });
    this.route('profile', {
        template: 'profile',
        title: 'Profile'
    });
    this.route('search', {
        template: 'search',
        title: 'Search'
    });
    this.route('wall', {
        template: 'wall',
        title: 'Wall'
    });
});

// User pages
Router.map(function() {
    this.route('lock', function() {
        this.render('lock');
        this.layout('userLayout');
    });
    this.route('login', function() {
        this.render('login');
        this.layout('userLayout');
    });
    this.route('recover', function() {
        this.render('recover');
        this.layout('userLayout');
    });
    this.route('signup', function() {
        this.render('signup');
        this.layout('userLayout');
    });
});

// Router transitions

Router.onAfterAction(function() {

    var ANIMATION_CLASS = 'fadeIn'; // see animate.css
    var ANIMATION_EVENTS = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd';
    var wrapper = $('main').addClass('animated');

    $('.layout-container').removeClass('sidebar-visible');

    wrapper
    // detach previous events
        .off(ANIMATION_EVENTS)
        // attach new event
        .on(ANIMATION_EVENTS, function() {
            // remove animation and prepare for next transition
            wrapper.removeClass(ANIMATION_CLASS)
        })
        // start animation
        .addClass(ANIMATION_CLASS);
});
