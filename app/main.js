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
        loginViewConfig : 'views/login/loginViewConfig',

        // Mixins
        mixin : 'mixins/mixin',
        rivetView : 'mixins/rivetView',

        // Channels
        channels : 'channels'
    }
});

require([
    'loginView',
    'loginViewConfig'
], function (LoginView, loginViewConfig) {

    var loginView = new LoginView(loginViewConfig);
    loginView.start();
    loginView.rivetView();

});