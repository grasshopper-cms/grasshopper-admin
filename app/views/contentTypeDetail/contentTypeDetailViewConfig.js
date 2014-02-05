/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'contentTypeDetailViewModel', 'appBinders', 'contentTypeDetailBinders',
    'backbone', 'formatters', 'resources'],
    function (formTemplate, rowTemplate, contentTypeDetailViewModel, appBinders, contentTypeDetailBinders,
              Backbone, formatters, resources) {
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
            mastheadButtons : [
                {
                    text : resources.contentType.addNewField,
                    href : '#',
                    dropdown : true
                }
            ],
            permissions : ['admin', 'editor', 'reader'],
            rivetsBinders : [appBinders, contentTypeDetailBinders],
            rivetsFormatters : [formatters],
            collection : new Backbone.Collection()
        };
    });
