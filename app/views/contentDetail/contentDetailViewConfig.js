/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel'],
    function (formTemplate, rowTemplate, contentDetailViewModel) {
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
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions: ['admin', 'reader', 'editor']
    };
});