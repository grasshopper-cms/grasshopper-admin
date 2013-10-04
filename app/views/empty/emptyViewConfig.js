/*global define:false*/
define(['text!views/empty/emptyView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'emptyView',
        el : '#stage',
        templateHtml : templateHtml
    };
});