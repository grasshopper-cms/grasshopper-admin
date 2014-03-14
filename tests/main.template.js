(function() {
    'use strict';

// Require.js allows us to configure shortcut alias
    require.config({
        shim : {
            mocha : {
                exports : 'mocha'
            },
            sinon : {
                exports : 'sinon'
            }
        },
        packages : [
            {
                name : 'underscore',
                location : '../app/vendor/lodash-amd/underscore'
            },
            {
                name : 'masseuse',
                location : '../app/vendor/masseuse/app'
            },
            {
                name : 'helpers',
                location : '../app/helpers'
            },
            {
                name : 'ace',
                main : 'ace',
                location : '../app/vendor/ace/lib/ace'
            }
        ]
        // <%= paths %>
    });

    require([
        'mocha',
        './loginViewTests'
    ], function (mocha) {
        mocha.run();
    });
}());