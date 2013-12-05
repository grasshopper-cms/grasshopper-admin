/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html', 'contentDetailViewModel', 'resources', 'constants'], function (formTemplate, rowTemplate, contentDetailViewModel, resources, constants) {
    'use strict';

    return {
        name : 'contentDetailView',
        ModelType : contentDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click #deleteContent' : 'deleteContent',
            'click .clickableCell' : 'handleRowClick'
        },
        appendView : true,
        prependView : false,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions: ['admin', 'reader', 'editor']
    };
});