/*global define:false*/
define(['text!views/forbidden/forbiddenView.html', 'resources', 'constants'],
    function (template, resources, constants) {
        'use strict';

        return {
            name : 'forbiddenView',
            modelData : {},
            browserTitle : 'Forbidden',
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                },
                {
                    text : resources.forbidden,
                    href : constants.internalRoutes.forbidden
                }
            ]
        };
    });