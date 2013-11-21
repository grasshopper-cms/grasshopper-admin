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
        forms : {
            exports : 'Forms',
            deps : ['foundation']
        },
        dropdown : {
            deps : ['foundation']
        },
        section : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        },
        tinymce: {
            exports: 'tinyMCE',
            init: function () {
                return this.tinymce;
            }
        },
        codemirror: {
            exports: 'CodeMirror'
        },
        codemirrorjs: {
            deps : ['codemirror']

        }
    },
    packages : [
        {
            name : 'underscore',
            location : 'vendor/lodash-amd/underscore'
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
        LocalStorage : 'vendor/masseuse/app/localStorage',
        backstrap: 'vendor/theme/backstrap',
        cirque: 'vendor/cirque/jquery.cirque',
        modernizr: 'vendor/modernizr/modernizr',
        tinymce: 'vendor/tinymce/js/tinymce/tinymce.min',
        tinytheme: 'vendor/tinymce/js/tinymce/themes/modern/theme.min',
        codemirror: 'vendor/codemirror/lib/codemirror',

        // Routers
        masseuseRouter : 'vendor/masseuse/app/masseuseRouter',
        router : 'router',

        // Foundation Dependencies
        alerts : 'vendor/foundation/js/foundation/foundation.alerts',
        forms : 'vendor/foundation/js/foundation/foundation.forms',
        dropdown: 'vendor/foundation/js/foundation/foundation.dropdown',
        section: 'vendor/foundation/js/foundation/foundation.section',

        // CodeMirror
        codemirrorjs: 'vendor/codemirror/mode/javascript/javascript',

        // Views
        masseuseBaseView : 'vendor/masseuse/app/baseView',
        baseView : 'views/grasshopperBaseView',
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
        contentIndexView : 'views/contentIndex/contentIndexView',
        contentIndexViewConfig : 'views/contentIndex/contentIndexViewConfig',
        contentEditView : 'views/contentEdit/contentEditView',
        contentEditViewConfig : 'views/contentEdit/contentEditViewConfig',
        contentTypeIndexView : 'views/contentTypeIndex/contentTypeIndexView',
        contentTypeIndexViewConfig : 'views/contentTypeIndex/contentTypeIndexViewConfig',
        contentTypeDetailView : 'views/contentTypeDetail/contentTypeDetailView',
        contentTypeDetailViewConfig : 'views/contentTypeDetail/contentTypeDetailViewConfig',
        mastheadView: 'views/masthead/mastheadView',
        mastheadViewConfig: 'views/masthead/mastheadViewConfig',
        nodeDetailView: 'views/nodeDetail/nodeDetailView',
        nodeDetailViewConfig: 'views/nodeDetail/nodeDetailViewConfig',
        nodeIndexView: 'views/nodeIndex/nodeIndexView',
        nodeIndexViewConfig: 'views/nodeIndex/nodeIndexViewConfig',
        assetIndexView: 'views/assetIndex/assetIndexView',
        assetIndexViewConfig: 'views/assetIndex/assetIndexViewConfig',

        // Mixins
        mixin : 'vendor/masseuse/app/mixin',
        rivetView : 'vendor/masseuse/app/rivetView',

        // Channels
        channels : 'vendor/masseuse/app/channels',

        // Models
        computedProperty : 'vendor/masseuse/app/computedProperty',
        proxyProperty : 'vendor/masseuse/app/proxyProperty',
        viewContext : 'vendor/masseuse/app/viewContext',
        masseuseModel : 'vendor/masseuse/app/MasseuseModel',
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
        contentIndexViewModel : 'models/viewModels/contentIndexViewModel',
        nodeDetailViewModel : 'models/viewModels/nodeDetailViewModel',
        nodeIndexViewModel : 'models/viewModels/nodeIndexViewModel',
        assetIndexViewModel : 'models/viewModels/assetIndexViewModel',

            // Workers
        loginWorker : 'workers/loginWorker',
        userWorker : 'workers/userWorker',

        // Collections
        paginatedCollection : 'vendor/masseuse/app/paginatedCollection',
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
    'forms',
    'dropdown',
    'section',
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

        $(document).foundation();

        // TODO : This should come from a build task run in Grunt
        $('head').append('<link rel="stylesheet" type="text/css" href="themes/' + constants.defaults.theme + '/main.css" />');

        new Router();
        Backbone.history.start();
        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
});