/*global define:false*/
define(['text!views/nodeDetail/nodeDetailView.html',
    'nodeDetailViewModel'],
    function (formTemplate, nodeDetailViewModel) {
        'use strict';

        return {
            name : 'nodeDetailView',
            ModelType : nodeDetailViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            permissions : ['admin', 'reader', 'editor']
        };
    });