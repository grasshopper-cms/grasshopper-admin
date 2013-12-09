/*global define:false*/
define(['text!views/contentBrowse/contentBrowseView.html', 'resources', 'contentBrowseViewModel', 'constants'],
    function (templateHtml, resources, contentBrowseViewModel, constants) {
    'use strict';

    return {
        name : 'contentBrowseView',
        ModelType : contentBrowseViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [
            ['channels.views', 'refreshContentBrowseView', 'refreshIndexViews']
        ],
        appendView: true,
        events: {},
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
        permissions: ['admin', 'reader', 'editor']
    };
});