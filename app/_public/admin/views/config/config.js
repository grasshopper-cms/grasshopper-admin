/*global define:false*/
define(['text!./template.html', 'resources', 'constants'],
    function (template, resources, constants) {
        'use strict';

        return {
            name: 'configView',
            modelData: {},
            browserTitle: resources.config,
            headerTab : 'config',
            appendTo: '#stage',
            wrapper: false,
            template: template,
            events: {},
            listeners: [],
            breadcrumbs: {
                icon: 'fa-wrench',
                crumbs: [
                    {
                        text: constants.home,
                        href: constants.internalRoutes.content
                    },
                    {
                        text: resources.config,
                        href: constants.internalRoutes.config
                    }
                ]
            }/*,
            permissions: ['admin']*/
        };
    });
