/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html', 'contentTypeDetailViewModel', 'binders', 'backbone'],
    function (formTemplate, rowTemplate, contentTypeDetailViewModel, binders, Backbone) {
        'use strict';

        return {
            name : 'contentTypeDetailView',
            ModelType : contentTypeDetailViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #deleteContentType' : 'prepareToDeleteContentType',
                'click .clickableCell' : 'handleRowClick',
                'click #saveContentType' : 'saveContentType'
            },
            bindings : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'editor', 'reader'],
            rivetsBinders : [binders],
            collection : new Backbone.Collection()
        };
    });
