/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel', 'appBinders', 'resources', 'constants'],
    function (formTemplate, rowTemplate, contentDetailModel, appBinders, resources, constants) {
        'use strict';

        return {
            name : 'contentDetail',
            ModelType : contentDetailModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #deleteContent' : 'deleteContent',
                'click .clickableCell' : 'handleRowClick',
                'click #saveContentButton' : 'saveContent'
            },
            listeners : [],
            mastheadButtons : [],
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                }
            ],
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [appBinders]
            }
        };
    });