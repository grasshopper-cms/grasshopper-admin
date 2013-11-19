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

        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : []
    };
});