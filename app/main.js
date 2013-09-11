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
        baseView : 'views/base/baseView',
        loginView : 'views/login/loginView',
        // Mixins
        rivetView : 'views/mixins/rivetView'
    }
});

require([
    'loginView'
], function (LoginView) {

    var loginView = new LoginView();

    loginView.rivetView();
    // locals
    // render login view
});
