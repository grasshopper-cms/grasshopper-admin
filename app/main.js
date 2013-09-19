/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        underscore : {
            exports : '_'
        }
    },
    paths : {
        // Libraries
        underscore : 'vendor/lodash/dist/lodash.underscore',
        jquery : 'vendor/jquery/jquery',
        backbone : 'vendor/backbone-amd/backbone',
        text : 'vendor/requirejs-text/text',
        rivets : 'vendor/rivets/dist/rivets',

        // Views
        baseView : 'vendor/masseuse/app/baseView',
        loginView : 'views/login/loginView',
        loginViewConfig : 'views/login/loginViewConfig',
        navbarView : 'views/navbar/navbarView',
        navbarViewConfig : 'views/navbar/navbarViewConfig',
        emptyView : 'views/empty/emptyView',
        emptyViewConfig : 'views/empty/emptyViewConfig',

        // Mixins
        mixin : 'vendor/masseuse/app/mixin',
        rivetView : 'mixins/rivetView',
        loginMixin : 'mixins/loginMixin',

        // Channels
        channels : 'vendor/masseuse/app/channels',

        // Models
        selfValidatingModel : 'models/selfValidatingModel',
        userModel : 'models/userModel',

        // View Models
        loginViewModel : 'models/viewModels/loginViewModel',
        navbarViewModel : 'models/viewModels/navbarViewModel',

        // Workers
        loginWorker : 'workers/loginWorker',

        // Api proxy
        api : 'api/api'
    }
});

require([
    'loginView',
    'loginViewConfig',
    'navbarView',
    'navbarViewConfig'
], function (LoginView, loginViewConfig, NavbarView, navbarViewConfig) {

    var loginView = new LoginView(loginViewConfig);
    loginView.start();
    loginView.rivetView();

    var navbarView = new NavbarView(navbarViewConfig);
    navbarView.start();
    navbarView.rivetView();

});