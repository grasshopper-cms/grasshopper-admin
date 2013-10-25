/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'contentIndexView',
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : {
            scope : '#contentIndex',
            prefix : 'contentIndex'
        }
    };
});