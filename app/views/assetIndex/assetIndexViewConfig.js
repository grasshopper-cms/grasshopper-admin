/*global define:false*/
define(['text!views/assetIndex/assetIndexView.html', 'assetIndexViewModel', 'assetIndexViewBinders'],
    function (template, assetIndexViewModel, assetIndexViewBinders) {
        'use strict';

        return {
            name : 'assetIndexView',
            ModelType : assetIndexViewModel,
            appendTo : '#assetIndex',
            wrapper : false,
            template : template,
            listeners : [],
            events : {},
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [assetIndexViewBinders]
            }
        };
    });