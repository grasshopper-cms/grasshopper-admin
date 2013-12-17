/*global define:false*/
define(['text!views/assetIndex/assetIndexView.html', 'assetIndexViewModel'],
    function (templateHtml, assetIndexViewModel) {
    'use strict';

    return {
        name : 'assetIndexView',
        ModelType : assetIndexViewModel,
        el : '#assetIndex',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        permissions: ['admin', 'reader', 'editor']
    };
});