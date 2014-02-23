/*global define:false*/
define(['text!views/addUser/addUserView.html', 'addUserViewModel', 'resources', 'constants'],
    function (formTemplate, addUserModel, resources, constants) {
    'use strict';

    return {
        name : 'addUser',
        ModelType : addUserModel,
        modelData : {},
        appendTo : '#stage',
        wrapper : false,
        template : formTemplate,
        events : {
            'click #saveUser' : 'saveUser'
        },
        listeners : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        breadcrumbs : [
            {
                text : resources.users,
                href : constants.internalRoutes.users
            }
        ],
        permissions : ['admin']
    };
});