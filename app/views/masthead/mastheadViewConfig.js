/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel'], function (templateHtml, mastheadViewModel) {
    'use strict';

    return {
        name : 'mastheadView',
        modelData : {
                        title: 'cms/folder/Pages',
                        icon: 'icon-file',
                        description: '23 content items. 45 files.'
                    },
        modelType : mastheadViewModel,
        el : '#masthead',
        templateHtml : templateHtml,
        events : {},
        appendView : true,
        bindings : [
            ['channels.views', 'updateMastheadButtons', 'setButtons']
        ],
        rivetConfig : 'auto',
        mastheadButtons : [
                {
                    text : 'Create Content',
                    href : '#'
                },
                {
                    text : 'Upload File',
                    href : '#'
                },
                {
                    text : 'create Folder',
                    href : '#'
                },
                {
                    text : 'Actions',
                    href : '#'
                }
            ]
    };
});