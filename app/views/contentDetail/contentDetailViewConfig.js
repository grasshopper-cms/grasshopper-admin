/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel', 'grasshopperBinders'],
    function (formTemplate, rowTemplate, contentDetailViewModel, grasshopperBinders) {
        'use strict';

        return {
            name : 'contentDetailView',
            ModelType : contentDetailViewModel,
            modelData : {},
            el : '#stage',
            template : formTemplate,
            events : {
                'click #deleteContent' : 'deleteContent',
                'click .clickableCell' : 'handleRowClick'
            },
            appendView : true,
            bindings : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'reader', 'editor'],
            rivetBinders : [grasshopperBinders]
        };
    });