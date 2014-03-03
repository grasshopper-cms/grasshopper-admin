/*global define:false*/
define(['text!views/usersIndex/usersIndexView.html', 'usersIndexViewModel', 'resources', 'constants',
    'usersIndexViewBinders'],
    function (template, UsersIndexViewModel, resources, constants,
              usersIndexViewBinders) {
        'use strict';

        return {
            name : 'usersIndexView',
            modelData : {},
            ModelType : UsersIndexViewModel,
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
                binders : [usersIndexViewBinders]
            },
            permissions : ['admin']
        };

    });