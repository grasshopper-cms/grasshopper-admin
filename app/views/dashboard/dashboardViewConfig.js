/*global define:false*/
define(['text!views/dashboard/dashboardView.html', 'dashboardViewModel', 'resources', 'constants'],
    function (template, DashboardViewModel, resources, constants) {
        'use strict';

        return {
            name : 'dashboardView',
            modelData : {},
            ModelType : DashboardViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
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