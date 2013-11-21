/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html', 'resources'], function (templateHtml, resources) {
    'use strict';

    return {
        name : 'contentIndexView',
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : {
            scope : '#contentIndex',
            prefix : 'contentIndex'
        },
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
        ]
    };
});