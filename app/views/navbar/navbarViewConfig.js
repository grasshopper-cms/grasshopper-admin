/*global define:false*/
define(['text!views/navbar/navbarView.html', 'navbarViewModel'], function (templateHtml, navbarViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {},
        ModelType : navbarViewModel,
        el : '#navbar',
        templateHtml : templateHtml
    };
});