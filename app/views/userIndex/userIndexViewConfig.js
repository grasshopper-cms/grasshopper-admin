/*global define:false*/
define(['text!views/userIndex/userIndexView.html', 'userIndexViewModel', 'resources', 'constants',
    'userIndexViewBinders'],
    function (template, UserIndexViewModel, resources, constants,
              userIndexViewBinders) {
        'use strict';

        return {
            name : 'userIndexView',
            modelData : {},
            ModelType : UserIndexViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {
                'change #limitDropdown' : 'changeLimit'
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
            ],
            rivetsConfig : {
                binders : [userIndexViewBinders]
            },
            permissions : ['admin']
        };

    });