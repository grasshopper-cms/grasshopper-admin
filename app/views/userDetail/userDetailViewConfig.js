/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'text!views/userDetail/_userDetailRow.html', 'userDetailViewModel',
    'resources', 'constants'],
    function (formTemplate, rowTemplate, userDetailModel, resources, constants) {
        'use strict';

        return {
            name : 'userDetail',
            modelData : {},
            ModelType : userDetailModel,
            appendTo : '#stage',
            wrapper : false,
            rivetConfig : 'auto',
            template : formTemplate,
            rowTemplate : rowTemplate,
            events : {
                'click #saveUser' : 'updateModel',
                'click .toggleEnabled' : 'toggleEnabled',
                'click .clickableCell' : 'handleRowClick'
            },
            listeners : [],
            mastheadButtons : [
                {
                    text : resources.mastheadButtons.addNewUser,
                    href : constants.internalRoutes.addUser
                }
            ],
            breadcrumbs : [
                {
                    text : resources.users,
                    href : constants.internalRoutes.users
                }
            ]
        };
    });