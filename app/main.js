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
        headerView : 'views/header/headerView',
        headerViewConfig : 'views/header/headerViewConfig',
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
        UserModel : 'models/UserModel',

        // View Models
        loginViewModel : 'models/viewModels/loginViewModel',
        headerViewModel : 'models/viewModels/headerViewModel',
        alertBoxViewModel : 'models/viewModels/alertBoxViewModel',

        // Workers
        loginWorker : 'workers/loginWorker',
        userWorker : 'workers/userWorker',

        // Api proxy
        api : 'api/api',

        // Validation
        validation : 'validation/validation',

        // Resources File
        resources : 'resources',

        // Global storage
        app : 'app'
    }
});

require([
    'headerView',
    'headerViewConfig',
    'alerts',
    'jquery',
    'router',
    'backbone',
    'app',
    'api'
], function (HeaderView, headerViewConfig, alerts, $, Router, Backbone, app, Api) {

    "use strict";
    $(document).foundation();

    var headerView = new HeaderView(headerViewConfig);
    headerView.start();
    headerView.rivetView();

    var router = new Router();


    Api.authenticateToken(localStorage.authToken)
        .done(function () {
            router.displayApp();
        })
        .fail(function () {
            router.displayLogin();
        });

    router.listenTo(app, 'change:loggedIn', function () {
        router.displayApp();
    });

    router.listenTo(app, 'change:loggedOut', function () {
        router.displayLogin();
    });


    Backbone.history.start();

});