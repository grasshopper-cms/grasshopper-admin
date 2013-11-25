/*global define:false*/
define(['text!views/usersIndex/usersIndexView.html', 'usersIndexViewModel', 'resources', 'constants'], function (templateHtml, UsersIndexViewModel, resources, constants) {
    'use strict';

    return {
        name : 'usersIndexView',
        modelData : {},
        ModelType : UsersIndexViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'change #limitDropdown' : 'changeLimit'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [
            {
                text : resources.mastheadButtons.addNewUser,
                href : constants.internalRoutes.newUser
            }
        ],
        breadcrumbs : [
            {
                text : resources.users,
                href : constants.internalRoutes.users
            }
        ],
        permissions: ['admin']
    };

});