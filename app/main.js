/*global require*/
// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        base64 : {
            exports : 'Base64'
        },
        alerts : {
            deps : ['foundation']
        },
        dropdown : {
            deps : ['foundation']
        },
        accordion : {
            deps : ['foundation']
        },
        tabs : {
            deps : ['foundation']
        },
        tooltip : {
            deps : ['foundation']
        },
        abide : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        },
        jqueryui : {
            deps : ['jquery']
        },
        widgetFactory : {
            deps : ['jqueryui']
        },
        mouseInteraction : {
            deps : ['jqueryui']
        },
        sortable : {
            deps : ['jqueryui', 'widgetFactory', 'mouseInteraction']
        }
    },
    packages : [
        {
            name : 'underscore',
            location : 'vendor/lodash-amd/underscore'
        },
        {
            name : 'masseuse',
            location : 'vendor/masseuse/app'
        },
        {
            name : 'helpers',
            location : 'helpers'
        },
        {
            name : 'issues',
            location : 'issues'
        }
    ]
    // <%= paths %>
});

require([
    'backbone',
    'underscore',
    'jquery',
    'router',
    'constants',
    'alerts',
    'dropdown',
    'accordion',
    'tabs',
    'tooltip',
    'abide',
    'modernizr',
    'sortable'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function (Backbone, _, $, Router, constants) {

        'use strict';

        _.templateSettings = {
            evaluate : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape : /\[\[-(.+?)\]\]/g
        };

        // TODO: For some reason this is not needed?
        $(document).foundation();

        // TODO : This should come from a build task run in Grunt
        $('head').append('<link rel="stylesheet" type="text/css" href="themes/' +
            constants.defaults.theme + '/main.css" />');

        var router = new Router();
        Backbone.history.start();
        router.breadcrumb = [];
        Backbone.history.on('route', function () {
            router.breadcrumb.push(this.fragment);
        }, this);
        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
    });