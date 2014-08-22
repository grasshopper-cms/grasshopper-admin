/*global define:false*/
define(['text!views/advancedSearch/content/template.html', 'resources', 'advancedSearch/content/model', 'constants', 'appBinders'],
    function (template, resources, model, constants, appBinders) {

        'use strict';

        return {
            name : 'contentSearchView',
            ModelType : model,
            browserTitle : 'Content Search',
            wrapper : false,
            template : template,
            listeners : [],
            events : {},
            breadcrumbs : [
                {
                    text : resources.advancedSearch,
                    href : constants.internalRoutes.advancedSearch
                },
                {
                    text : 'content',
                    href : constants.internalRoutes.advancedSearch + '/content'
                }
            ],
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [appBinders]
            }
        };
    });