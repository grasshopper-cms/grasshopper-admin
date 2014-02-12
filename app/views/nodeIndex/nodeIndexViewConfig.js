/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'],
    function (template, resources, nodeIndexViewModel) {
        'use strict';

        return {
            name : 'nodeIndexView',
            ModelType : nodeIndexViewModel,
            template : template,
            wrapper : false,
            rivetConfig : 'auto',
            listeners : [],
            events : {},
            appendTo : '.content-table',
            permissions : ['admin', 'reader', 'editor']
        };
    });