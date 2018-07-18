import './login.html';

(function() {
    'use strict';

    Template.login.onRendered(userLogin);

    function userLogin() {

        var $form = $('#user-login');
        $form.validate({
            errorPlacement: errorPlacementInput,
            // Form rules
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            },
            submitHandler: function(/*form*/) {
                var email = $('#email').val();
                var password = $('#password').val();

                Meteor.loginWithPassword(email, password, function(error, result){
                  if(error){
                    console.log(error.reason);
                    swal('Error', error.reason, 'error');
                  } else {
                    var redirectAfterLogin = Session.get('redirectAfterLogin');
                    Router.go('dashboard');
                  }
                });
            }
        });
    }

    // Necessary to place dyncamic error messages
    // without breaking the expected markup for custom input
    function errorPlacementInput(error, element) {
        if( element.parent().is('.mda-form-control') ) {
            error.insertAfter(element.parent()); // insert after .mda-form-control
        }
        else if ( element.is(':radio') || element.is(':checkbox')) {
            error.insertAfter(element.parent());
        }
        else {
            error.insertAfter(element);
        }
    }

})();
