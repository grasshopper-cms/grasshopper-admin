/*global define:false*/
define(['text!views/assetIndex/assetIndexView.html', 'assetIndexViewModel'],
    function (template, assetIndexViewModel) {
        'use strict';

        return {
            name : 'assetIndexView',
            ModelType : assetIndexViewModel,
            appendTo : '#assetIndex',
            wrapper : false,
            template : template,
            rivetConfig : 'auto',
            listeners : [],
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });