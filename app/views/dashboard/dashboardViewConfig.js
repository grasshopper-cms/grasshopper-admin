/*global define:false*/
define(['text!views/dashboard/dashboardView.html', 'dashboardViewModel', 'resources'], function (templateHtml, dashboardViewModel, resources) {
    'use strict';

    return {
        name : 'dashboardView',
        modelData:{
                    name: 'Bob'
                  },
        modelType : dashboardViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {},
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : []
    };
});