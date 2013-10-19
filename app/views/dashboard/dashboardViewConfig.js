/*global define:false*/
define(['text!views/dashboard/dashboardView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'dashboardView',
        el : '#stage',
        templateHtml : templateHtml,
        modelData:{
            name: 'Bob'
        }
    };
});