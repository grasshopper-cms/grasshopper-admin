/*global define:false*/
define(['text!views/dashboard/dashboardView.html', 'dashboardViewModel'], function (templateHtml, dashboardViewModel) {
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
        rivetConfig : 'auto'
    };
});