/*global define:false*/
define(['text!views/userIndex/userIndexView.html', 'userIndexViewModel', 'resources', 'constants',
        'userDetailRow', 'appBinders'],
    function (template, UserIndexViewModel, resources, constants,
              UserDetailRow, appBinders) {
        'use strict';

        return {
            name: 'userIndexView',
            modelData: {},
            ModelType: UserIndexViewModel,
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
                    'user-detail-row': UserDetailRow
                }
            },
            permissions: ['admin']
        };

    });