/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'],
    function (template, resources, nodeIndexViewModel) {
        'use strict';

        return {
            name : 'nodeIndexView',
            ModelType : nodeIndexViewModel,
            appendTo : '#nodeIndex',
            wrapper : false,
            template : template,
            rivetConfig : 'auto',
            bindings : [],
            events : {},
            permissions : ['admin', 'reader', 'editor']
        };
    });