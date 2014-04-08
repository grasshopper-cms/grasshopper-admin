/*global define:false*/
define(['text!views/addUser/addUserView.html', 'addUserViewModel', 'resources', 'constants', 'appBinders'],
    function (formTemplate, addUserModel, resources, constants, appBinders) {
    'use strict';

    return {
        name : 'addUser',
        ModelType : addUserModel,
        modelData : {},
        appendTo : '#stage',
        wrapper : false,
        template : formTemplate,
        events : {},
        listeners : [],
        mastheadButtons : [],
        breadcrumbs : [
            {
                text : resources.users,
                href : constants.internalRoutes.users
            }
        ],
        permissions : ['admin'],
        rivetsConfig : {
            binders : [appBinders]
        }
    };
});