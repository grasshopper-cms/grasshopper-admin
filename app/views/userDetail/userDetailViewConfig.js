/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'text!views/userDetail/_userDetailRow.html', 'userDetailViewModel',
    'resources', 'constants'],
    function (formTemplate, rowTemplate, userDetailViewModel, resources, constants) {
        'use strict';

        return {
            name : 'userDetailView',
            modelData : {},
            ModelType : userDetailViewModel,
            el : '#stage',
            templateHtml : formTemplate,
            events : {
                'click #saveUser' : 'updateModel',
                'click .toggleEnabled' : 'toggleEnabled',
                'click .clickableCell' : 'handleRowClick'
            },
            appendView : true,
            bindings : [],
            rivetConfig : 'auto',
            mastheadButtons : [
                {
                    text : resources.mastheadButtons.addNewUser,
                    href : constants.internalRoutes.newUser
                }
            ]
        };
    });