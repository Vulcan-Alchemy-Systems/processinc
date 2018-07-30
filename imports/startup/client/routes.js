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
    }
  },
  template: 'dashboard',
  title: 'Dashboard',
  name: 'dashboard'
});

// Job Routes
Router.map(function() {
  this.route('/job', {
      onBeforeAction: function() {
        if(!Meteor.userId()) {
          Router.go('login');
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
    }
  },
  template : 'admin',
  title : 'Admin',
  name: 'admin'
});

Router.route('/grow-type', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
    }
  },
  template : 'growType',
  title : 'Grow Types',
  name: 'growType'
});

Router.route('/intake-type', {
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      // check if user is allowed
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
      }
    },
    template: 'userView',
    title: 'View User',
    name: 'userView'
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
