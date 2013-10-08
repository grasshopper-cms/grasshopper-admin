/*global define:false*/
define(['text!views/masthead/mastheadView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'mastheadView',
        el : '#masthead',
        templateHtml : templateHtml,
        data: {
            title: 'Dashboard'
        }
    };
});