/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'], function (templateHtml, resources, nodeIndexViewModel) {
    'use strict';

    return {
        name : 'nodeIndexView',
        ModelType : nodeIndexViewModel,
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
        permissions: ['admin']
    };
});