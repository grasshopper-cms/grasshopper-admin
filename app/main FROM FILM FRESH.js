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
        topbar : {
            deps : ['foundation']
        },
        orbit : {
            deps : ['foundation']
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
        },
        nearest : {
            exports : 'Nearest',
            deps : ['jquery']
        }
    }
//   <%= paths %>
});

require([
    'jquery',
    'router',
    'alerts',
    'forms',
    'underscore'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function ($, Router, alerts, forms, _) {

        'use strict';

        _.templateSettings = {
            evaluate    : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape      : /\[\[-(.+?)\]\]/g
        };

        $(document).foundation();

        new Router().start();
        Backbone.history.start();
        Backbone.history.breadCrumb = [];
        Backbone.history.on('route', function() { this.breadCrumb.push(this.fragment); }, this);
        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
    });