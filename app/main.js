/*global require*/
// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        underscore : {
            exports : '_'
        },
        base64 : {
            exports : 'Base64'
        },
        alerts : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        }

    },
    paths : {
        // Libraries
        underscore : 'vendor/lodash/dist/lodash.underscore',
        jquery : 'vendor/jquery/jquery',
        backbone : 'vendor/backbone-amd/backbone',
        text : 'vendor/requirejs-text/text',
        rivets : 'vendor/rivets/dist/rivets',
        base64 : 'vendor/js-base64/base64',
        foundation : 'vendor/foundation/js/foundation/foundation',

        // Routers
        router : 'routes',

        // Foundation Dependencies
        alerts : 'vendor/foundation/js/foundation/foundation.alerts',

        // Views
        baseView : 'vendor/masseuse/app/baseView',
        loginView : 'views/login/loginView',
        loginViewConfig : 'views/login/loginViewConfig',
        navbarView : 'views/navbar/navbarView',
        navbarViewConfig : 'views/navbar/navbarViewConfig',
        emptyView : 'views/empty/emptyView',
        emptyViewConfig : 'views/empty/emptyViewConfig',
        alertBoxView : 'views/alertBox/alertBoxView',
        alertBoxViewConfig : 'views/alertBox/alertBoxViewConfig',

        // Mixins
        mixin : 'vendor/masseuse/app/mixin',
        rivetView : 'mixins/rivetView',

        // Channels
        channels : 'vendor/masseuse/app/channels',

        // Models
        ComputedProperty : 'vendor/masseuse/app/ComputedProperty',
        masseuseModel : 'vendor/masseuse/app/MasseuseModel',
        selfValidatingModel : 'models/selfValidatingModel',
        userModel : 'models/userModel',

        // View Models
        loginViewModel : 'models/viewModels/loginViewModel',
        navbarViewModel : 'models/viewModels/navbarViewModel',
        alertBoxViewModel : 'models/viewModels/alertBoxViewModel',

        // Workers
        loginWorker : 'workers/loginWorker',
        userWorker : 'workers/userWorker',

        // Api proxy
        api : 'api/api',

        // Validation
        validation : 'validation/validation',

        // Resources File
        resources : 'resources'
    }
});

require([
    'loginView',
    'loginViewConfig',
    'navbarView',
    'navbarViewConfig',
    'alerts',
    'jquery',
    'router'
], function (LoginView, loginViewConfig, NavbarView, navbarViewConfig, alerts, $, Router) {
    "use strict";

    $(document).foundation();

    var loginView = new LoginView(loginViewConfig);
    loginView.start();
    loginView.rivetView();

    var navbarView = new NavbarView(navbarViewConfig);
    navbarView.start();
    navbarView.rivetView();

    var router = new Router;

    router.on('route:defaultRoute', function(actions) {
        console.log("HEY!!");
        console.log(actions);
    });

//    Backbone.history.start();

});