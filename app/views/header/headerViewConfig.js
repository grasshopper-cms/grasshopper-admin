/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel', 'app'], function (templateHtml, headerViewModel, app) {
    'use strict';

    return {
        name : 'headerView',
        modelData : {},
        ModelType : headerViewModel,
        el : '#header',
        templateHtml : templateHtml
    };
});