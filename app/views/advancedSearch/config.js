/*global define:false*/
define(['text!views/advancedSearch/template.html', 'resources', 'advancedSearch/model', 'constants', 'appBinders', 'advancedSearch/content/view'],
    function (template, resources, model, constants, appBinders, ContentSearchView) {

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
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [appBinders],
                childViewBinders : {
                    'content-search-view': ContentSearchView
                }
            },
            transitions : {
                enter : 'transition.fadeIn'
            }
        };
    });