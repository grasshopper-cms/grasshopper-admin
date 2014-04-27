/*global define:false*/
define(['text!views/contentBrowse/contentBrowseView.html', 'resources', 'contentBrowseViewModel', 'constants',
        'appBinders', 'nodeDetailView', 'contentDetailRowView', 'assetDetailRow'],
    function (template, resources, contentBrowseViewModel, constants,
              appBinders, NodeDetailView, ContentDetailRowView, AssetDetailRow) {

        'use strict';

        return {
            name : 'contentBrowseView',
            ModelType : contentBrowseViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            listeners : [
                ['channels.views', 'activateTab', 'activateTab'],
                ['channels.views', 'nodeAdded', 'addNewNode'],
                ['channels.views', 'assetAdded', 'addNewAsset']
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
                    'node-detail-row': NodeDetailView,
                    'content-detail-row': ContentDetailRowView,
                    'asset-detail-row' : AssetDetailRow
                }
            }
        };
    });