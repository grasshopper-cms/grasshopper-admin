/*global define:false*/
define(['text!views/contentIndex/contentIndexView.html', 'contentIndexViewModel'],
    function (template, contentIndexViewModel) {
        'use strict';

        return {
            name : 'contentIndexView',
            ModelType : contentIndexViewModel,
            el : '#contentIndex',
            template : template,
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });