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
        underscore : 'vendor/lodash/dist/lodash.underscore',
        jquery : 'vendor/jquery/jquery',
        backbone : 'vendor/backbone-amd/backbone',
        text : 'vendor/requirejs-text/text',

        baseView : 'views/base/baseView'
    }
});

require([
    'underscore',
    'jquery',
    'backbone',
    'baseView'
], function (_, $, Backbone, BaseView) {
    // console.log("....");
    // $("h1").text("_." + _.VERSION);
    // console.log("..a..");
    // console.log(BaseView);
    // console.log("..x..");
});
