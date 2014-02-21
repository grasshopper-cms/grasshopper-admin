(function() {
    'use strict';

// Require.js allows us to configure shortcut alias
    require.config({
        shim : {
            underscore : {
                exports : '_'
            },
            mocha : {
                exports : 'mocha'
            },
            sinon : {
                exports : 'sinon'
            }
        },
        paths : {
            // Libraries
            underscore : '../app/vendor/lodash/dist/lodash.underscore',
            jquery : '../app/vendor/jquery/jquery',
            backbone : '../app/vendor/backbone-amd/backbone',
            text : '../app/vendor/requirejs-text/text',
            rivets : '../app/vendor/rivets/dist/rivets',
            mocha : '../app/vendor/mocha/mocha',
            chai : '../app/vendor/chai/chai',
            squire : '../app/vendor/squire/src/Squire',
            sinon : '../app/vendor/sinon/lib/sinon',
            sinonSpy : '../app/vendor/sinon/lib/sinon/spy',
            sinonChai : '../app/vendor/sinon-chai/lib/sinon-chai',
            sinonCall : '../app/vendor/sinon/lib/sinon/call',

            // Views
            baseView : '../app/vendor/masseuse/app/baseView',
            loginView : '../app/views/login/loginView',
            loginViewConfig : '../app/views/login/loginViewConfig',
            navbarView : '../app/views/navbar/navbarView',
            navbarViewConfig : '../app/views/navbar/navbarViewConfig',

            // Mixins
            mixin : '../app/vendor/masseuse/app/mixin',
            rivetView : '../app/mixins/rivetView',
            loginMixin : '../app/mixins/loginMixin',

            // Channels
            channels : '../app/vendor/masseuse/app/channels',

            // Models
            selfValidatingModel : '../app/models/selfValidatingModel',
            userModel : '../app/models/userModel',

            // View Models
            loginViewModel : '../app/models/viewModels/loginViewModel',
            navbarViewModel : '../app/models/viewModels/navbarViewModel',

            // Workers
            loginWorker : '../app/workers/loginWorker',

            // Api proxy
            api : '../app/api/api'
        }
    });

    require([
        'mocha',
        './loginViewTests'
    ], function (mocha) {
        mocha.run();
    });
}());