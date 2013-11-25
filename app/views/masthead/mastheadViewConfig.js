/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel', 'resources'], function (templateHtml, mastheadViewModel, resources) {
    'use strict';

    return {
        name : 'mastheadView',
        modelData : {
                        icon: 'icon-file',
                        description: '23 content items. 45 files.'
                    },
        modelType : mastheadViewModel,
        el : '#masthead',
        templateHtml : templateHtml,
        events : {},
        appendView : true,
        bindings : [
            ['channels.views', 'updateMastheadButtons', 'setButtons'],
            ['channels.views', 'updateMastheadBreadcrumbs', 'setBreadcrumbs']
        ],
        rivetConfig : 'auto',
        defaultBreadcrumbs : [
            {
                text: resources.home,
                href: '#'
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