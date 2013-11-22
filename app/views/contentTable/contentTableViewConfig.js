/*global define:false*/
define(['text!views/contentTable/contentTableView.html', 'resources', 'contentTableViewModel'], function (templateHtml, resources, contentTableViewModel) {
    'use strict';

    return {
        name : 'contentTableView',
        ModelType : contentTableViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        mastheadButtons : [
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
        ],
        permissions: ['admin', 'reader', 'editor']
    };
});