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
        forms : {
            exports : 'Forms',
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
        paginator : 'vendor/backbone.paginator/lib/backbone.paginator',
        LocalStorage : 'localStorage',
        backstrap: 'vendor/theme/backstrap',

        // Routers
        masseuseRouter : 'vendor/masseuse/app/masseuseRouter',
        router : 'router',

        // Foundation Dependencies
        alerts : 'vendor/foundation/js/foundation/foundation.alerts',
        forms : 'vendor/foundation/js/foundation/foundation.forms',

        // Views
        baseView : 'vendor/masseuse/app/baseView',
        loginView : 'views/login/loginView',
        loginViewConfig : 'views/login/loginViewConfig',
        dashboardView : 'views/dashboard/dashboardView',
        dashboardViewConfig : 'views/dashboard/dashboardViewConfig',
        headerView : 'views/header/headerView',
        headerViewConfig : 'views/header/headerViewConfig',
        emptyView : 'views/empty/emptyView',
        emptyViewConfig : 'views/empty/emptyViewConfig',
        alertBoxView : 'views/alertBox/alertBoxView',
        alertBoxViewConfig : 'views/alertBox/alertBoxViewConfig',
        userDetailView : 'views/userDetail/userDetailView',
        userDetailViewConfig : 'views/userDetail/userDetailViewConfig',
        usersIndexView : 'views/usersIndex/usersIndexView',
        usersIndexViewConfig : 'views/usersIndex/usersIndexViewConfig',
        mastheadView: 'views/masthead/mastheadView',
        mastheadViewConfig: 'views/masthead/mastheadViewConfig',


        // Mixins
        mixin : 'vendor/masseuse/app/mixin',
        rivetView : 'vendor/masseuse/app/rivetView',

        // Channels
        channels : 'vendor/masseuse/app/channels',

        // Models
        computedProperty : 'vendor/masseuse/app/computedProperty',
        proxyProperty : 'vendor/masseuse/app/proxyProperty',
        masseuseModel : 'vendor/masseuse/app/MasseuseModel',
        selfValidatingModel : 'models/selfValidatingModel',
        UserModel : 'models/UserModel',

        // View Models
        loginViewModel : 'models/viewModels/loginViewModel',
        headerViewModel : 'models/viewModels/headerViewModel',
        alertBoxViewModel : 'models/viewModels/alertBoxViewModel',
        userDetailViewModel : 'models/viewModels/userDetailViewModel',
        usersIndexViewModel : 'models/viewModels/usersIndexViewModel',

        // Workers
        loginWorker : 'workers/loginWorker',
        userWorker : 'workers/userWorker',

        // Collections
        paginatedCollection : 'vendor/masseuse/app/paginatedCollection',
        userCollection : 'collections/userCollection',

        // Api proxy
        api : 'api/api',

        // Validation
        validation : 'validation/validation',

        // Resources File
        resources : 'resources',
        constants : 'constants'
    }
});

require([
    'jquery',
    'router',
    'alerts',
    'forms'
],
    /**
     * @param $
     * @param {Router} Router
     */
    function ($, Router) {

    'use strict';
    $(document).foundation();

    new Router();
    Backbone.history.start();
    // TODO: setup push state on nginx
    //Backbone.history.start({pushState: true});
});