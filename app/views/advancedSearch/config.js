/*global define:false*/
define(['text!views/advancedSearch/template.html', 'resources', 'advancedSearch/model', 'constants', 'appBinders'],
    function (template, resources, model, constants, appBinders) {

        'use strict';

        return {
            name : 'advancedSearchView',
            ModelType : model,
            browserTitle : 'Advanced Search',
            appendTo : '#stage',
            wrapper : false,
            template : template,
            listeners : [],
            events : {},
            breadcrumbs : [
                {
                    text : resources.advancedSearch,
                    href : constants.internalRoutes.advancedSearch
                }
            ],
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [appBinders]
            },
            transitions : {
                enter : 'transition.fadeIn'
            }
        };
    });