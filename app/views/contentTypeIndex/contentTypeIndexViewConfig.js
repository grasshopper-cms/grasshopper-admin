/*global define:false*/
define(['text!views/contentTypeIndex/contentTypeIndexView.html', 'contentTypeIndexViewModel', 'resources', 'constants',
    'appBinders'],
    function (template, contentTypeIndexViewModel, resources, constants, appBinders) {
        'use strict';

        return {
            name : 'contentTypeIndexView',
            ModelType : contentTypeIndexViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            listeners : [],
            events : {},
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                },
                {
                    text : resources.contentTypes,
                    href : constants.internalRoutes.contentTypes
                }
            ],
            permissions : ['admin', 'editor'],
            rivetsConfig : {
                binders : [appBinders]
            }
        };
    });