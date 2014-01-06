/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html', 'contentTypeDetailViewModel'],
    function (formTemplate, rowTemplate, contentTypeDetailViewModel) {
        'use strict';

        return {
            name : 'contentTypeDetailView',
            ModelType : contentTypeDetailViewModel,
            modelData : {},
            el : '#stage',
            templateHtml : formTemplate,
            events : {
                'click #deleteContentType' : 'prepareToDeleteContentType',
                'click .clickableCell' : 'handleRowClick'
            },
            appendView : true,
            bindings : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'editor', 'reader']
        };
    });