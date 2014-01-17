/*global define:false*/
define(['grasshopperBaseView'], function (GrasshopperBaseView) {
    'use strict';
    return GrasshopperBaseView.extend({
        afterRender : afterRender
    });

    function afterRender() {
        window.headerView = this;
    }

});
