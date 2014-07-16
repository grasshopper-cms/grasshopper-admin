/*global define:false*/
define(['grasshopperBaseView', 'headerViewConfig', 'jquery'], function (GrasshopperBaseView, headerViewConfig, $) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : headerViewConfig,
        toogleNavigation : toogleNavigation
    });

    function toogleNavigation(e) {
        e.preventDefault();
        $('#main-nav').slideToggle('fast');
    }

});
