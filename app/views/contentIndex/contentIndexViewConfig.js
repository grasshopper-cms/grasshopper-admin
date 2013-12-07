/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html', 'contentIndexViewModel'],
    function (templateHtml, contentIndexViewModel) {
    'use strict';

    return {
        name : 'contentIndexView',
        ModelType : contentIndexViewModel,
        el : '#contentIndex',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'reader', 'editor']
    };
});