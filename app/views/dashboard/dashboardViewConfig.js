/*global define:false*/
define(['text!views/dashboard/dashboardView.html', 'dashboardViewModel', 'resources', 'constants'],
    function (templateHtml, dashboardViewModel, resources, constants) {
    'use strict';

    return {
        name : 'dashboardView',
        modelData:{},
        modelType : dashboardViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {},
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        breadcrumbs : [
            {
                text : resources.dashboard,
                href : constants.internalRoutes.home
            }
        ]
    };
});