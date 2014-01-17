/*global define:false*/
define(['text!views/dashboard/dashboardView.html', 'dashboardViewModel', 'resources', 'constants', 'masseuse'],
    function (template, DashboardViewModel, resources, constants, masseuse) {
        'use strict';

        var ViewContext = masseuse.ViewContext;
        return {
            name : 'dashboardView',
            modelData : {
                userModel : ViewContext('app.user')
            },
            ModelType : DashboardViewModel,
            el : '#stage',
            template : template,
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