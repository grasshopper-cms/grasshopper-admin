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
            listeners : [
                ['channels.views', 'updateMastheadButtons', 'setButtons'],
                ['channels.views', 'updateMastheadBreadcrumbs', 'setBreadcrumbs']
            ],
            defaultBreadcrumbs : {
                icon: 'fa-search',
                crumbs: [
                    {
                        text : resources.home,
                        href : '#'
                    }
                ]
            },
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
