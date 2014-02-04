/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'contentTypeDetailViewModel', 'binders', 'backbone', 'formatters'],
    function (formTemplate, rowTemplate, contentTypeDetailViewModel, binders, Backbone, formatters) {
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
            listeners : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'editor', 'reader'],
            rivetsBinders : [binders],
            rivetsFormatters : [formatters],
            collection : new Backbone.Collection()
        };
    });
