/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'contentTypeDetailViewModel', 'appBinders', 'contentTypeDetailBinders',
    'backbone', 'formatters', 'resources', 'constants', 'contentTypeDetailFormatters'],
    function (formTemplate, rowTemplate, contentTypeDetailViewModel, appBinders, contentTypeDetailBinders,
              Backbone, formatters, resources, constants, contentTypeDetailFormatters) {
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
            listeners : [
                ['channels.views', 'mastheadDropdownClicked', 'addNewFieldToContentType']
            ],
            rivetConfig : 'auto',
            mastheadButtons : [
                {
                    text : resources.contentType.addNewField,
                    href : '#',
                    dropdown : true
                }
            ],
            breadcrumbs : [
                {
                    text : resources.contentTypes,
                    href : constants.internalRoutes.contentTypes
                }
            ],
            permissions : ['admin', 'editor', 'reader'],
            rivetsBinders : [appBinders, contentTypeDetailBinders],
            rivetsFormatters : [formatters, contentTypeDetailFormatters],
            collection : new Backbone.Collection()
        };
    });
