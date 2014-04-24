/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'userDetailViewModel',
    'resources', 'constants', 'appBinders'],
    function (formTemplate, userDetailModel, resources, constants, appBinders) {
        'use strict';

        return {
            name : 'userDetail',
            modelData : {},
            ModelType : userDetailModel,
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                },
                {
                    text : resources.users,
                    href : constants.internalRoutes.users
                }
            ],
            rivetsConfig : {
                binders : [appBinders]
            }
        };
    });