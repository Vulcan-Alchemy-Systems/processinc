Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

// Default route
Router.route('/', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      Router.go('dashboard');
    }
  }
});

// Dashboard
Router.route('/dashboard', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      this.next();
    }
  },
  template: 'dashboard',
  title: 'Dashboard',
  name: 'dashboard'
});

// machine
Router.map(function() {
  this.route('/machine', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'machine',
    title: 'Machines',
    name: 'machine'
  });
  this.route('/machine/:id/view', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'machineView',
    title: 'View Machine',
    name: 'machineView'
  });
});

// location
Router.map(function() {
  this.route('/location', {
      onBeforeAction: function() {
        if(!Meteor.userId()) {
          Router.go('login');
        } else {
          this.next();
        }
      },
      template: 'location',
      title: 'Locations',
      name: 'location'
  });
  this.route('/location/:_id/view', {
      onBeforeAction: function() {
        if(!Meteor.userId()) {
          Router.go('login');
        } else {
          this.next();
        }
      },
      template: 'locationView',
      title: 'View Location',
      name: 'locationView'
  });
  this.route('/location/:locationId/room/:roomId/view', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'roomView',
    title: 'View Room',
    name: 'roomView'
  });
});

// Job Routes
Router.map(function() {
  this.route('/job', {
      onBeforeAction: function() {
        if(!Meteor.userId()) {
          Router.go('login');
        } else {
          this.next();
        }
      },
      template: 'job',
      title: 'Jobs',
      name: 'job'
  });
  this.route('/job/:_id/view', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobView',
    title: 'View Job',
    name: 'jobView'
  });
  this.route('/job/:_id/edit', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobUpdate',
    title: 'Edit Job',
    name: 'jobUpdate'
  });
  this.route('/job/:_id/delete', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobDelete',
    title: 'Delete Job',
    name: 'jobDelete'
  });
  this.route('/job/create/:_id', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobCreate',
    title: 'New Job',
    name: 'jobCreate'
  });
  this.route('/job/:_id/form/create', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobFormCreate',
    title: 'New Job Form',
    name: 'jobFormCreate'
  });
  this.route('/job/:_id/form/:_formId/edit', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobFormUpdate',
    title: 'Edit Job Form',
    name: 'jobFormUpdate'
  });
  this.route('/job/:_id/form/:_formId/delete', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobFormDelete',
    title: 'Delete Job Form',
    name: 'jobFormDelete'
  });
  this.route('/job/:_id/form/:_formId/view', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        this.next();
      }
    },
    template: 'jobFormView',
    title: 'View Job Form',
    name: 'jobFormView'
  });
});

// roles routes
Router.route('/role', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed

      this.next();
    }
  },
  template: 'role',
  title: 'Roles',
  name: 'role'
});

// admin
Router.route('/admin', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed

      this.next();
    }
  },
  template : 'admin',
  title : 'Admin',
  name: 'admin'
});

Router.route('/grow-type', {
  template : 'growType',
  title : 'Grow Types',
  name: 'growType',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
      this.next();
    }
  }
});

Router.route('/intake-type', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
      this.next();
    }
  },
  template: 'intakeType',
  title: 'Intake Types',
  name: 'intakeType'
});

Router.route('/return-type', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
      this.next();
    }
  },
  template: 'returnType',
  title: 'Return Types',
  name: 'returnType'
});

Router.route('/weight-type', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
      Router.go('/weight-type');
      this.next();
    }
  },
  template: 'weightType',
  title: 'Weight Types',
  name: 'weightType'
});

// User routes
Router.map(function() {
  this.route('/user', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        // check if user is allowed
        this.next();
      }
    },
    template: 'user',
    title: 'Users',
    name: 'user'
  });
  this.route('/user/create', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        // check if user is allowed
        this.next();
      }
    },
    template: 'userCreate',
    title: 'New User',
    name: 'userCreate'
  });
  this.route('/user/:_id/view', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        // check if user is allowed
        this.next();
      }
    },
    template: 'userView',
    title: 'View User',
    name: 'userView'
  });
  this.route('profile', {
    onBeforeAction: function() {
      if(!Meteor.userId()) {
        Router.go('login');
      } else {
        // check if user is allowed
        this.next();
      }
    },
    template: 'profile',
    title: 'Profile',
    name: 'profile'
  });
  this.route('/lock', function() {
      this.render('lock');
      this.layout('userLayout');
  });
  this.route('/login', function() {
      this.render('login');
      this.layout('userLayout');
  });
  this.route('/recover', function() {
      this.render('recover');
      this.layout('userLayout');
  });
  this.route('/signup', function() {
      this.render('signup');
      this.layout('userLayout');
  });
});


// Cards
Router.route('/cards', {
    template : 'Cards',
    title : 'Cards',
    name: 'cards'
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

    this.route('search', {
        template: 'search',
        title: 'Search'
    });
    this.route('wall', {
        template: 'wall',
        title: 'Wall'
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
