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
            exports : 'jquery',
            deps : ['jquery']
        },
        widgetFactory : {
            exports : 'jquery',
            deps : ['jqueryui']
        },
        mouseInteraction : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        sortable : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory', 'mouseInteraction']
        },
        accordion : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        ckeditorAdapter : {
            exports : 'jquery',
            deps : ['jquery', 'ckeditor']
        },
        scrollToFixed : {
            exports : 'jquery',
            deps : ['jquery']
        },
        datetimepicker : {
            exports : 'datetimepicker',
            deps : ['jquery']
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
    'tabs',
    'tooltip',
    'abide',
    'modernizr',
    'sortable',
    'accordion',
    'scrollToFixed'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function (Backbone, _, $, Router, constants) {
        'use strict';
        var ajaxRequests = {}, requestsMidflight=0;

        _.templateSettings = {
            evaluate : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape : /\[\[-(.+?)\]\]/g
        };

        $.ajaxSetup({
            /* jslint unused: false */
            beforeSend: function (jqXHR, settings) {
                requestsMidflight++;
                var $deferred = new $.Deferred(), showSpinnerLoading = function () {
                    if (requestsMidflight > 0) {
                        $('body').addClass('spinner-loading');
                    }
                }, hideSpinnerLoading = function () {
                    if (requestsMidflight <= 0) {
                        $('body').removeClass('spinner-loading');
                    }
                };
                $deferred.then(showSpinnerLoading);
                setTimeout(function () {
                    $deferred.resolve();
                }, constants.timeouts.showSpinnerLoadingTimeout);
                jqXHR.always(function (jqXHR, textStatus) {
                    requestsMidflight--;
                    $deferred.reject();
                    hideSpinnerLoading();
                });
            }

        });

        // TODO: For some reason this is not needed?
        $(document).foundation();

        new Router();
        Backbone.history.start();

        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
    });
