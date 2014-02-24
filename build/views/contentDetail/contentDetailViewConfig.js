/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel', 'appBinders', 'resources', 'constants'],
    function (formTemplate, rowTemplate, contentDetailViewModel, appBinders, resources, constants) {
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
                'click .clickableCell' : 'handleRowClick',
                'click #saveContentButton' : 'saveContent'
            },
            listeners : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                }
            ],
            permissions : ['admin', 'reader', 'editor'],
            rivetsBinders : [appBinders]
        };
    });