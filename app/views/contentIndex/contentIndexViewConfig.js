/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html', 'resources', 'contentIndexViewModel'], function (templateHtml, resources, contentIndexViewModel) {
    'use strict';

    return {
        name : 'contentIndexView',
        ModelType : contentIndexViewModel,
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