/*global define:false*/
define(['text!views/assetIndex/assetIndexView.html', 'assetIndexViewModel'],
    function (template, assetIndexViewModel) {
        'use strict';

        return {
            name : 'assetIndexView',
            ModelType : assetIndexViewModel,
            el : '#assetIndex',
            template : template,
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });