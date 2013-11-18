/*global define:false*/
define(['text!views/contentTypeIndex/contentTypeIndexView.html', 'contentTypeIndexViewModel'], function (templateHtml, contentTypeIndexViewModel) {
    'use strict';

    return {
        name : 'contentTypeIndexView',
        ModelType : contentTypeIndexViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [
        ],
        appendView : false,
        events : {

        },
        mastheadButtons: []
    };
});