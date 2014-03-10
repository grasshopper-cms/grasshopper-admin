/*global define:false*/
define(['grasshopperBaseView', 'dashboardViewConfig', 'issues'],
    function (GrasshopperBaseView, dashboardViewConfig, Issues) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : dashboardViewConfig,
        afterRender : afterRender
    });

    function afterRender() {
        console.log(Issues.createIssue());
    }
});