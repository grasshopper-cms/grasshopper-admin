/*global define:false*/
define(['text!views/nodeDetail/nodeDetailView.html', 'text!views/nodeDetail/_nodeDetailRow.html',
    'nodeDetailViewModel'],
    function (formTemplate, rowTemplate, nodeDetailViewModel) {
        'use strict';

        return {
            name : 'nodeDetailView',
            ModelType : nodeDetailViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #deleteNode' : 'prepareToDeleteNode',
                'click #editNode' : 'editNodeName',
                'click #editTypes' : 'editContentTypes',
                'click .clickableCell' : 'handleRowClick'
            },
            listeners : [],
            mastheadButtons : [],
            permissions : ['admin', 'reader', 'editor']
        };
    });