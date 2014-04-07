/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'userDetailViewModel',
    'resources', 'constants'],
    function (formTemplate, userDetailModel, resources, constants) {
        'use strict';

        return {
            name : 'userDetail',
            modelData : {},
            ModelType : userDetailModel,
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #saveUser' : 'updateModel',
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