/*global define:false*/
define(['text!views/nodeDetail/nodeDetailView.html', 'text!views/nodeDetail/_nodeDetailRow.html',
    'nodeDetailViewModel'],
    function (formTemplate, rowTemplate, nodeDetailViewModel) {
    'use strict';

    return {
        name : 'nodeDetailView',
        ModelType : nodeDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click #deleteNode' : 'deleteNode',
            'click #editNode' : 'editNode',
            'click .clickableCell' : 'handleRowClick'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions: ['admin', 'reader', 'editor']
    };
});