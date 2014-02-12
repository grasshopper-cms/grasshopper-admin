/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html', 'contentIndexViewModel'],
    function (template, contentIndexViewModel) {
        'use strict';

        return {
            name : 'contentIndexView',
            ModelType : contentIndexViewModel,
            appendTo : '#contentBrowseTable',
            wrapper : false,
            template : template,
            rivetConfig : 'auto',
            listeners : [],
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });