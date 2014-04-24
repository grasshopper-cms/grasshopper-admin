/*global define:false*/
define(['text!views/nodeDetail/nodeDetailView.html', 'text!views/nodeDetail/_nodeDetailRow.html',
    'nodeDetailViewModel'],
    function (formTemplate, rowTemplate, nodeDetailViewModel) {
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