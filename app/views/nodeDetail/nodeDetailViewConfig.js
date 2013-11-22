/*global define:false*/
define(['text!views/nodeDetail/nodeDetailView.html', 'text!views/nodeDetail/_nodeDetailRow.html', 'nodeDetailViewModel', 'resources', 'constants'], function (formTemplate, rowTemplate, nodeDetailViewModel, resources, constants) {
    'use strict';

    return {
        name : 'nodeDetailView',
        ModelType : nodeDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click #deleteNode' : 'deleteNode'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions: ['admin', 'reader', 'editor']
    };
});