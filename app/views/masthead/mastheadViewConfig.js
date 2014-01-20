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
            bindings : [
                ['channels.views', 'updateMastheadButtons', 'setButtons'],
                ['channels.views', 'updateMastheadBreadcrumbs', 'setBreadcrumbs']
            ],
            rivetConfig : 'auto',
            defaultBreadcrumbs : [
                {
                    text : resources.home,
                    href : '#'
                }
            ],
            defaultMastheadButtons : [
                {
                    text : resources.mastheadButtons.createContent,
                    href : '#'
                },
                {
                    text : resources.mastheadButtons.uploadFile,
                    href : '#'
                },
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