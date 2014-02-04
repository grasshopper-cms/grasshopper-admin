/*global define:false*/
define(['text!views/contentBrowse/contentBrowseView.html', 'resources', 'contentBrowseViewModel', 'constants'],
    function (template, resources, contentBrowseViewModel, constants) {
        'use strict';

        return {
            name : 'contentBrowseView',
            ModelType : contentBrowseViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            rivetConfig : 'auto',
            listeners : [
                ['channels.views', 'refreshContentBrowseView', 'refreshIndexViews'],
                ['channels.views', 'activateTab', 'activateTab']
            ],
            events : {},
            mastheadButtons : [
                {
                    text : resources.mastheadButtons.createContent,
                    href : constants.internalRoutes.createContent
                },
                {
                    text : resources.mastheadButtons.uploadFile,
                    href : constants.internalRoutes.createAssets
                },
                {
                    text : resources.mastheadButtons.createFolder,
                    href : constants.internalRoutes.createFolder
                },
                {
                    text : resources.mastheadButtons.actions,
                    href : '#'
                }
            ],
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                }
            ],
            permissions : ['admin', 'reader', 'editor']
        };
    });