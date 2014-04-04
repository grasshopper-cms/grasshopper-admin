/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel', 'resources', 'mastheadViewBinders'],
    function (template, mastheadViewModel, resources, mastheadViewBinders) {
        'use strict';

        return {
            name : 'mastheadView',
            modelData : {},
            ModelType : mastheadViewModel,
            appendTo : '#masthead',
            wrapper : false,
            template : template,
            events : {},
            listeners : [
                ['channels.views', 'updateMastheadButtons', 'setButtons'],
                ['channels.views', 'updateMastheadBreadcrumbs', 'setBreadcrumbs']
            ],
            defaultBreadcrumbs : [
                {
                    text : resources.home,
                    href : '#'
                }
            ],
            defaultMastheadButtons : [
                {
                    text : resources.mastheadButtons.createFolder,
                    href : '#'
                }
            ],
            rivetsConfig : {
                binders : [mastheadViewBinders]
            }
        };
    });