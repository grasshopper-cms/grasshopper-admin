(function() {
    'use strict';

// Require.js allows us to configure shortcut alias
    require.config({
        shim : {
            mocha : {
                exports : 'mocha'
            },
            sinon : {
                exports : 'sinon'
            }
        },
        packages : [
            {
                name : 'underscore',
                location : '../app/vendor/lodash-amd/underscore'
            },
            {
                name : 'masseuse',
                location : '../app/vendor/masseuse/app'
            },
            {
                name : 'helpers',
                location : '../app/helpers'
            },
            {
                name : 'ace',
                main : 'ace',
                location : '../app/vendor/ace/lib/ace'
            }
        ]
        //  paths: 
        , paths: {
            'jquery' : '../app/vendor/jquery/jquery',
            'jqueryui' : '../app/vendor/jquery.ui/ui/jquery.ui.core',
            'backbone' : '../app/vendor/backbone-amd/backbone',
            'text' : '../app/vendor/requirejs-text/text',
            'rivets' : '../app/vendor/rivets/dist/rivets',
            'base64' : '../app/vendor/js-base64/base64',
            'foundation' : '../app/vendor/foundation/js/foundation/foundation',
            'modernizr' : '../app/vendor/modernizr/modernizr',
            'ckeditor' : '../app/vendor/ckeditor/ckeditor',
            'ckeditorAdapter' : '../app/vendor/ckeditor/adapters/jquery',
            'ace' : '../app/vendor/ace/lib/ace',
            'moment' : '../app/vendor/moment/moment',
            'router' : '../app/router',
            'alerts' : '../app/vendor/foundation/js/foundation/foundation.alert',
            'dropdown' : '../app/vendor/foundation/js/foundation/foundation.dropdown',
            'accordion' : '../app/vendor/jquery.ui/ui/jquery.ui.accordion',
            'tabs' : '../app/vendor/foundation/js/foundation/foundation.tab',
            'tooltip' : '../app/vendor/foundation/js/foundation/foundation.tooltip',
            'abide' : '../app/vendor/foundation/js/foundation/foundation.abide',
            'widgetFactory' : '../app/vendor/jquery.ui/ui/jquery.ui.widget',
            'mouseInteraction' : '../app/vendor/jquery.ui/ui/jquery.ui.mouse',
            'sortable' : '../app/vendor/jquery.ui/ui/jquery.ui.sortable',
            'grasshopperBaseView' : '../app/views/grasshopperBaseView',
            'addAssetsView' : '../app/views/addAssets/addAssetsView',
            'addAssetsViewConfig' : '../app/views/addAssets/addAssetsViewConfig',
            'addAssetsViewModel' : '../app/views/addAssets/addAssetsViewModel',
            'addContentView' : '../app/views/addContent/addContentView',
            'addContentViewConfig' : '../app/views/addContent/addContentViewConfig',
            'addContentViewModel' : '../app/views/addContent/addContentViewModel',
            'addFolderView' : '../app/views/addFolder/addFolderView',
            'addFolderViewConfig' : '../app/views/addFolder/addFolderViewConfig',
            'addFolderViewModel' : '../app/views/addFolder/addFolderViewModel',
            'addUserView' : '../app/views/addUser/addUserView',
            'addUserViewConfig' : '../app/views/addUser/addUserViewConfig',
            'addUserViewModel' : '../app/views/addUser/addUserViewModel',
            'alertBoxView' : '../app/views/alertBox/alertBoxView',
            'alertBoxViewConfig' : '../app/views/alertBox/alertBoxViewConfig',
            'alertBoxViewModel' : '../app/views/alertBox/alertBoxViewModel',
            'assetDetailView' : '../app/views/assetDetail/assetDetailView',
            'assetDetailViewConfig' : '../app/views/assetDetail/assetDetailViewConfig',
            'assetDetailViewModel' : '../app/views/assetDetail/assetDetailViewModel',
            'assetIndexView' : '../app/views/assetIndex/assetIndexView',
            'assetIndexViewConfig' : '../app/views/assetIndex/assetIndexViewConfig',
            'assetIndexViewModel' : '../app/views/assetIndex/assetIndexViewModel',
            'contentBrowseView' : '../app/views/contentBrowse/contentBrowseView',
            'contentBrowseViewConfig' : '../app/views/contentBrowse/contentBrowseViewConfig',
            'contentBrowseViewModel' : '../app/views/contentBrowse/contentBrowseViewModel',
            'contentDetailView' : '../app/views/contentDetail/contentDetailView',
            'contentDetailViewConfig' : '../app/views/contentDetail/contentDetailViewConfig',
            'contentDetailViewModel' : '../app/views/contentDetail/contentDetailViewModel',
            'contentIndexView' : '../app/views/contentIndex/contentIndexView',
            'contentIndexViewConfig' : '../app/views/contentIndex/contentIndexViewConfig',
            'contentIndexViewModel' : '../app/views/contentIndex/contentIndexViewModel',
            'contentTypeDetailView' : '../app/views/contentTypeDetail/contentTypeDetailView',
            'contentTypeDetailViewConfig' : '../app/views/contentTypeDetail/contentTypeDetailViewConfig',
            'contentTypeDetailViewModel' : '../app/views/contentTypeDetail/contentTypeDetailViewModel',
            'contentTypeDetailViewFieldsCollection' : '../app/views/contentTypeDetail/contentTypeDetailViewFieldsCollection',
            'contentTypeIndexView' : '../app/views/contentTypeIndex/contentTypeIndexView',
            'contentTypeIndexViewConfig' : '../app/views/contentTypeIndex/contentTypeIndexViewConfig',
            'contentTypeIndexViewModel' : '../app/views/contentTypeIndex/contentTypeIndexViewModel',
            'fileBrowserView' : '../app/views/fileBrowser/fileBrowserView',
            'fileBrowserViewConfig' : '../app/views/fileBrowser/fileBrowserViewConfig',
            'fileBrowserViewModel' : '../app/views/fileBrowser/fileBrowserViewModel',
            'headerView' : '../app/views/header/headerView',
            'headerViewConfig' : '../app/views/header/headerViewConfig',
            'headerViewModel' : '../app/views/header/headerViewModel',
            'loginView' : '../app/views/login/loginView',
            'loginViewConfig' : '../app/views/login/loginViewConfig',
            'loginViewModel' : '../app/views/login/loginViewModel',
            'mastheadView' : '../app/views/masthead/mastheadView',
            'mastheadViewConfig' : '../app/views/masthead/mastheadViewConfig',
            'mastheadViewModel' : '../app/views/masthead/mastheadViewModel',
            'modalView' : '../app/views/modal/modalView',
            'modalViewConfig' : '../app/views/modal/modalViewConfig',
            'modalViewModel' : '../app/views/modal/modalViewModel',
            'nodeDetailView' : '../app/views/nodeDetail/nodeDetailView',
            'nodeDetailViewConfig' : '../app/views/nodeDetail/nodeDetailViewConfig',
            'nodeDetailViewModel' : '../app/views/nodeDetail/nodeDetailViewModel',
            'nodeIndexView' : '../app/views/nodeIndex/nodeIndexView',
            'nodeIndexViewConfig' : '../app/views/nodeIndex/nodeIndexViewConfig',
            'nodeIndexViewModel' : '../app/views/nodeIndex/nodeIndexViewModel',
            'nodeTreeView' : '../app/views/nodeTree/nodeTreeView',
            'nodeTreeViewConfig' : '../app/views/nodeTree/nodeTreeViewConfig',
            'nodeTreeViewModel' : '../app/views/nodeTree/nodeTreeViewModel',
            'nodeTreeViewBinders' : '../app/views/nodeTree/nodeTreeViewBinders',
            'pluginWrapperView' : '../app/views/pluginWrapper/pluginWrapperView',
            'pluginWrapperViewConfig' : '../app/views/pluginWrapper/pluginWrapperViewConfig',
            'pluginWrapperViewModel' : '../app/views/pluginWrapper/pluginWrapperViewModel',
            'userDetailView' : '../app/views/userDetail/userDetailView',
            'userDetailViewConfig' : '../app/views/userDetail/userDetailViewConfig',
            'userDetailViewModel' : '../app/views/userDetail/userDetailViewModel',
            'userIndexView' : '../app/views/userIndex/userIndexView',
            'userIndexViewConfig' : '../app/views/userIndex/userIndexViewConfig',
            'userIndexViewModel' : '../app/views/userIndex/userIndexViewModel',
            'selfValidatingModel' : '../app/models/selfValidatingModel',
            'UserModel' : '../app/models/userModel',
            'grasshopperModel' : '../app/models/grasshopperModel',
            'pluginSetupModel' : '../app/views/contentTypeDetail/pluginSetupModel',
            'loginWorker' : '../app/workers/loginWorker',
            'contentTypeWorker' : '../app/workers/contentTypeWorker',
            'assetWorker' : '../app/workers/assetWorker',
            'breadcrumbWorker' : '../app/workers/breadcrumbWorker',
            'nodeWorker' : '../app/workers/nodeWorker',
            'urlWorker' : '../app/workers/urlWorker',
            'grasshopperCollection' : '../app/collections/grasshopperCollection',
            'userCollection' : '../app/collections/userCollection',
            'api' : '../app/api/api',
            'validation' : '../app/validation/validation',
            'plugins' : '../app/plugins',
            'appBinders' : '../app/appBinders',
            'pluginWrapperBinders' : '../app/views/pluginWrapper/pluginWrapperBinders',
            'contentTypeDetailBinders' : '../app/views/contentTypeDetail/contentTypeDetailBinders',
            'userIndexViewBinders' : '../app/views/userIndex/binders',
            'formatters' : '../app/formatters',
            'contentTypeDetailFormatters' : '../app/views/contentTypeDetail/contentTypeDetailFormatters',
            'resources' : '../app/resources',
            'constants' : '../app/constants',
            'mocha' : '../app/vendor/mocha/mocha',
            'chai' : '../app/vendor/chai/chai',
            'sinon' : '../app/vendor/sinon/lib/sinon',
            'sinonSpy' : '../app/vendor/sinon/lib/sinon/spy',
            'sinonChai' : '../app/vendor/sinon-chai/lib/sinon-chai',
            'sinonCall' : '../app/vendor/sinon/lib/sinon/call'
        }
    });

    require([
        'mocha',
        './loginViewTests'
    ], function (mocha) {
        mocha.run();
    });
}());