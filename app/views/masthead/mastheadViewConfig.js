/*global define:false*/
define(['text!views/masthead/mastheadView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'mastheadView',
        el : '#masthead',
        templateHtml : templateHtml,
        data: {
            icon: 'icon-user',
            title: 'Users',
            description: 'Lorem ipsum...'
        }
    };
});