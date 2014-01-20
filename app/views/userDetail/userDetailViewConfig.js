/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'text!views/userDetail/_userDetailRow.html', 'userDetailViewModel',
    'resources', 'constants'],
    function (formTemplate, rowTemplate, userDetailViewModel, resources, constants) {
        'use strict';

        return {
            name : 'userDetailView',
            modelData : {},
            ModelType : userDetailViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #saveUser' : 'updateModel',
                'click .toggleEnabled' : 'toggleEnabled',
                'click .clickableCell' : 'handleRowClick'
            },
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