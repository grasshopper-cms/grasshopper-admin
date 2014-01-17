/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'],
    function (template, resources, nodeIndexViewModel) {
        'use strict';

        return {
            name : 'nodeIndexView',
            ModelType : nodeIndexViewModel,
            el : '#nodeIndex',
            template : template,
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });