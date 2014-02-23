/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'appBinders', 'resources', 'constants'],
    function (addContentTemplate, addContentModel, appBinders, resources, constants) {
        'use strict';

        return {
            name : 'addContent',
            ModelType : addContentModel,
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
                    text : resources.content,
                    href : constants.internalRoutes.content
                }
            ],
            permissions : ['admin', 'editor'],
            rivetsBinders : [appBinders]
        };
    });