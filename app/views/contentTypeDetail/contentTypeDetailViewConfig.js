/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html',
    'text!views/contentTypeDetail/_contentTypeDetailRow.html',
    'contentTypeDetailViewModel', 'appBinders', 'contentTypeDetailBinders',
    'backbone', 'formatters', 'resources', 'constants', 'contentTypeDetailFormatters', 'underscore',
    'pluginSetupModel'],
    function (formTemplate, rowTemplate, contentTypeDetailModel, appBinders, contentTypeDetailBinders,
              Backbone, formatters, resources, constants, contentTypeDetailFormatters, _,
              pluginSetupModel) {
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
            listeners : [
                ['channels.views', 'mastheadDropdownClicked', 'addNewFieldToContentType']
            ],
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
            rivetsConfig : {
                formatters : [formatters, contentTypeDetailFormatters],
                binders : [appBinders, contentTypeDetailBinders]
            },
            // TODO: This should not be here.
            collection : new (Backbone.Collection.extend({
                model : pluginSetupModel,
                toJSON: function () {
                    var json = Backbone.Collection.prototype.toJSON.apply(this);

                    return _.map(json, function(obj) {
                        return _.pick(obj, 'required', 'label', 'max', 'min',
                            'options', 'type', 'validation', '_id', 'useAsLabel', 'helpText');
                    });
                }
            }))([], {})
        };
    });