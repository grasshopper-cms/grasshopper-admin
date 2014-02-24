/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'appBinders', 'resources', 'constants'],
    function (addContentTemplate, addContentViewModel, appBinders, resources, constants) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : addContentTemplate,
            events : {
                'click #saveContentButton' : 'saveContent'
            },
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : [],
            breadcrumbs : [
                {
                    text : resources.contentTypes,
                    href : constants.internalRoutes.contentTypes
                }
            ],
            permissions : ['admin', 'editor'],
            rivetsBinders : [appBinders]
        };
    });