/*global define:false*/
define(['grasshopperBaseView', 'actionsBarViewConfig', 'jquery'],
    function (grasshopperBaseView, actionsBarViewConfig, $) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : actionsBarViewConfig,
            afterRender : afterRender
        });

        function afterRender() {
            $(window).on('scroll', function() {
                console.log('scrolled');
            });
        }

    });