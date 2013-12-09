/*global require*/
// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        base64 : {
            exports : 'Base64'
        },
        alerts : {
            deps : ['foundation']
        },
        dropdown : {
            deps : ['foundation']
        },
        tabs : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        }
    },
    packages : [
        {
            name : 'underscore',
            location : 'vendor/lodash-amd/underscore'
        },
        {
            name : 'masseuse',
            location : 'vendor/masseuse/app'
        }
    ],
    paths : {
        // Libraries
        jquery : 'vendor/jquery/jquery',
        backbone : 'vendor/backbone-amd/backbone',
        text : 'vendor/requirejs-text/text',
        rivets : 'vendor/rivets/dist/rivets',
        base64 : 'vendor/js-base64/base64',
        foundation : 'vendor/foundation/js/foundation/foundation',
        paginator : 'vendor/backbone.paginator/lib/backbone.paginator',
        cirque: 'vendor/cirque/jquery.cirque',
        modernizr: 'vendor/modernizr/modernizr',

        // Routers
        router : 'router',

        // Foundation Dependencies
        alerts : 'vendor/foundation/js/foundation/foundation.alert',
        dropdown: 'vendor/foundation/js/foundation/foundation.dropdown',
        tabs: 'vendor/foundation/js/foundation/foundation.tab',

        // Views
        grasshopperBaseView : 'views/grasshopperBaseView',
        loginView : 'views/login/loginView',
        loginViewConfig : 'views/login/loginViewConfig',
        dashboardView : 'views/dashboard/dashboardView',
        dashboardViewConfig : 'views/dashboard/dashboardViewConfig',
        headerView : 'views/header/headerView',
        headerViewConfig : 'views/header/headerViewConfig',
        alertBoxView : 'views/alertBox/alertBoxView',
        alertBoxViewConfig : 'views/alertBox/alertBoxViewConfig',
        modalView : 'views/modal/modalView',
        modalViewConfig : 'views/modal/modalViewConfig',
        userDetailView : 'views/userDetail/userDetailView',
        userDetailViewConfig : 'views/userDetail/userDetailViewConfig',
        usersIndexView : 'views/usersIndex/usersIndexView',
        usersIndexViewConfig : 'views/usersIndex/usersIndexViewConfig',
        addUserView : 'views/addUser/addUserView',
        addUserViewConfig : 'views/addUser/addUserViewConfig',
        contentBrowseView : 'views/contentBrowse/contentBrowseView',
        contentBrowseViewConfig : 'views/contentBrowse/contentBrowseViewConfig',
        contentTypeIndexView : 'views/contentTypeIndex/contentTypeIndexView',
        contentTypeIndexViewConfig : 'views/contentTypeIndex/contentTypeIndexViewConfig',
        contentTypeDetailView : 'views/contentTypeDetail/contentTypeDetailView',
        contentTypeDetailViewConfig : 'views/contentTypeDetail/contentTypeDetailViewConfig',
        mastheadView : 'views/masthead/mastheadView',
        mastheadViewConfig : 'views/masthead/mastheadViewConfig',
        nodeDetailView : 'views/nodeDetail/nodeDetailView',
        nodeDetailViewConfig : 'views/nodeDetail/nodeDetailViewConfig',
        nodeIndexView : 'views/nodeIndex/nodeIndexView',
        nodeIndexViewConfig : 'views/nodeIndex/nodeIndexViewConfig',
        assetIndexView : 'views/assetIndex/assetIndexView',
        assetIndexViewConfig : 'views/assetIndex/assetIndexViewConfig',
        contentDetailView : 'views/contentDetail/contentDetailView',
        contentDetailViewConfig : 'views/contentDetail/contentDetailViewConfig',
        contentIndexView : 'views/contentIndex/contentIndexView',
        contentIndexViewConfig : 'views/contentIndex/contentIndexViewConfig',
        assetDetailView : 'views/assetDetail/assetDetailView',
        assetDetailViewConfig : 'views/assetDetail/assetDetailViewConfig',
        addFolderView : 'views/addFolder/addFolderView',
        addFolderViewConfig : 'views/addFolder/addFolderViewConfig',
        addContentView : 'views/addContent/addContentView',
        addContentViewConfig : 'views/addContent/addContentViewConfig',
        addAssetsView : 'views/addAssets/addAssetsView',
        addAssetsViewConfig : 'views/addAssets/addAssetsViewConfig',

        // Models
        selfValidatingModel : 'models/selfValidatingModel',
        UserModel : 'models/UserModel',
        grasshopperModel : 'models/grasshopperModel',

        // View Models
        loginViewModel : 'models/viewModels/loginViewModel',
        headerViewModel : 'models/viewModels/headerViewModel',
        alertBoxViewModel : 'models/viewModels/alertBoxViewModel',
        modalViewModel : 'models/viewModels/modalViewModel',
        userDetailViewModel : 'models/viewModels/userDetailViewModel',
        usersIndexViewModel : 'models/viewModels/usersIndexViewModel',
        addUserViewModel : 'models/viewModels/addUserViewModel',
        dashboardViewModel : 'models/viewModels/dashboardViewModel',
        mastheadViewModel : 'models/viewModels/mastheadViewModel',
        contentTypeIndexViewModel : 'models/viewModels/contentTypeIndexViewModel',
        contentTypeDetailViewModel : 'models/viewModels/contentTypeDetailViewModel',
        contentBrowseViewModel : 'models/viewModels/contentBrowseViewModel',
        nodeDetailViewModel : 'models/viewModels/nodeDetailViewModel',
        nodeIndexViewModel : 'models/viewModels/nodeIndexViewModel',
        assetIndexViewModel : 'models/viewModels/assetIndexViewModel',
        contentIndexViewModel : 'models/viewModels/contentIndexViewModel',
        contentDetailViewModel : 'models/viewModels/contentDetailViewModel',
        assetDetailViewModel : 'models/viewModels/assetDetailViewModel',
        addFolderViewModel : 'models/viewModels/addFolderViewModel',
        addContentViewModel : 'models/viewModels/addContentViewModel',
        addAssetsViewModel : 'models/viewModels/addAssetsViewModel',

            // Workers
        loginWorker : 'workers/loginWorker',
        userWorker : 'workers/userWorker',
        contentTypeWorker : 'workers/contentTypeWorker',
        nodeWorker : 'workers/nodeWorker',

        // Collections
        userCollection : 'collections/userCollection',

        // Api proxy
        api : 'api/api',

        // Validation
        validation : 'validation/validation',

        // Resources File
        resources : 'resources',
        constants : 'constants'
    }
});

require([
    'underscore',
    'jquery',
    'router',
    'constants',
    'alerts',
    'dropdown',
    'tabs',
    'modernizr'
],
    /**
     * @param $
     * @param {Router} Router
     */
    function (_, $, Router, constants) {

        'use strict';

        _.templateSettings = {
            evaluate    : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape      : /\[\[-(.+?)\]\]/g
        };

        // TODO: For some reason this is not needed?
        $(document).foundation();

        // TODO : This should come from a build task run in Grunt
        $('head').append('<link rel="stylesheet" type="text/css" href="themes/' + constants.defaults.theme + '/main.css" />');

        var router = new Router();
        Backbone.history.start();
        router.breadcrumb = [];
        Backbone.history.on('route', function() { router.breadcrumb.push(this.fragment); }, this);
        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
});