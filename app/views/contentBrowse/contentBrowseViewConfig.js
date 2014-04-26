/*global define:false*/
define(['text!views/contentBrowse/contentBrowseView.html', 'resources', 'contentBrowseViewModel', 'constants',
        'appBinders', 'nodeDetailView'],
    function (template, resources, contentBrowseViewModel, constants,
              appBinders, NodeDetailView) {

        'use strict';

        return {
            name : 'contentBrowseView',
            ModelType : contentBrowseViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            listeners : [
                ['channels.views', 'refreshContentBrowseView', 'refreshIndexViews'],
                ['channels.views', 'activateTab', 'activateTab'],
                ['channels.views', 'nodeAdded', 'addNewNode']
            ],
            events : {},
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                }
            ],
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                binders : [appBinders],
                childViewBinders : {
                    'node-detail-row': NodeDetailView
                }
            }
        };
    });