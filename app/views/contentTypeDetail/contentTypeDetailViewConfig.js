/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html', 'text!views/contentTypeDetail/_contentTypeDetailRow.html', 'contentTypeDetailViewModel', 'resources', 'constants'], function (formTemplate, rowTemplate, contentTypeDetailViewModel, resources, constants) {
    'use strict';

    return {
        name : 'contentTypeDetailView',
        ModelType : contentTypeDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click #deleteContentType' : 'deleteContentType',
            'click .clickableCell' : 'handleRowClick'
        },
        appendView : true,
        prependView : false,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions: ['admin', 'editor', 'reader']
    };
});