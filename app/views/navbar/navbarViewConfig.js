/*global define:false*/
define(['text!views/navbar/navbarView.html', 'navbarViewModel', 'app'], function (templateHtml, navbarViewModel, app) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {},
        ModelType : navbarViewModel,
        el : '#navbar',
        templateHtml : templateHtml
    };
});