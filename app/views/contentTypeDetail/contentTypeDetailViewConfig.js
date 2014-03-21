/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'contentTypeDetailViewModel', 'appBinders', 'contentTypeDetailBinders',
    'backbone', 'formatters', 'resources', 'constants', 'contentTypeDetailFormatters',
    'contentTypeDetailViewFieldsCollection'],
    function (formTemplate, rowTemplate, contentTypeDetailModel, appBinders, contentTypeDetailBinders,
              Backbone, formatters, resources, constants, contentTypeDetailFormatters,
              ContentTypeDetailViewFieldsCollection) {
        'use strict';

        return {
            name : 'contentTypeDetail',
            ModelType : contentTypeDetailModel,
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
            mastheadButtons : [
                {
                    text : resources.mastheadButtons.addContentType,
                    href : constants.internalRoutes.newContentType
                }
            ],
            breadcrumbs : [
                {
                    text : resources.contentTypes,
                    href : constants.internalRoutes.contentTypes
                }
            ],
            permissions : ['admin', 'editor', 'reader'],
            rivetsConfig : {
                formatters : [formatters, contentTypeDetailFormatters],
                binders : [appBinders, contentTypeDetailBinders]
            },
            collection : new ContentTypeDetailViewFieldsCollection()
        };
    });