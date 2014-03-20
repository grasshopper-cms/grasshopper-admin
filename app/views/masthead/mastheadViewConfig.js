/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel', 'resources'],
    function (template, mastheadViewModel, resources) {
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
                },
                {
                    text : resources.mastheadButtons.actions,
                    href : '#'
                }
            ]
        };
    });