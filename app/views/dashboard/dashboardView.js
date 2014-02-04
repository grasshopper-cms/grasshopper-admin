/*global define:false*/
define(['grasshopperBaseView', 'dashboardViewConfig'], function (GrasshopperBaseView, dashboardViewConfig) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : dashboardViewConfig
    });
});