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
        loginViewModel : 'views/login/loginViewModel',

        // Mixins
        mixin : 'vendor/masseuse/app/mixin',
        rivetView : 'mixins/rivetView',

        // Channels
        channels : 'vendor/masseuse/app/channels',

        // Models
        userModel : 'models/user'
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