/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel', 'grasshopperBinders'],
    function (formTemplate, rowTemplate, contentDetailViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'contentDetailView',
            ModelType : contentDetailViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #deleteContent' : 'deleteContent',
                'click .clickableCell' : 'handleRowClick'
            },
            bindings : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'reader', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });