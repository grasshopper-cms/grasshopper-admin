/*global define:false*/
define(['text!views/userIndex/userIndexView.html', 'userIndexViewModel', 'resources', 'constants',
        'userDetailRow/view', 'appBinders'],
    function (template, UserIndexViewModel, resources, constants,
              UserDetailRowView, appBinders) {
        'use strict';

        return {
            name: 'userIndexView',
            modelData: {},
            ModelType: UserIndexViewModel,
            browserTitle : 'Users',
            appendTo: '#stage',
            wrapper: false,
            template: template,
            events: {
                'change #limitDropdown': 'changeLimit'
            },
            listeners: [],
            breadcrumbs: [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                },
                {
                    text: resources.users,
                    href: constants.internalRoutes.users
                }
            ],
            rivetsConfig: {
                binders : [appBinders],
                childViewBinders: {
                    'user-detail-row': UserDetailRowView
                }
            },
            permissions: ['admin']
        };

    });