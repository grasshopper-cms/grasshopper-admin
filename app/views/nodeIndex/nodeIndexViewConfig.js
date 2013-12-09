/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'],
    function (templateHtml, resources, nodeIndexViewModel) {
    'use strict';

    return {
        name : 'nodeIndexView',
        ModelType : nodeIndexViewModel,
        el : '#nodeIndex',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'reader', 'editor']
    };
});