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
        tooltip : {
            deps : ['foundation']
        },
        abide : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        },
        jqueryui : {
            exports : 'jquery',
            deps : ['jquery']
        },
        select2 : {
            exports : 'jquery',
            deps : ['jquery']
        },
        widgetFactory : {
            exports : 'jquery',
            deps : ['jqueryui']
        },
        mouseInteraction : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        sortable : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory', 'mouseInteraction']
        },
        accordion : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        ckeditorAdapter : {
            exports : 'jquery',
            deps : ['jquery', 'ckeditor']
        },
        scrollToFixed : {
            exports : 'jquery',
            deps : ['jquery']
        },
        datetimepicker : {
            exports : 'datetimepicker',
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
        },
        {
            name : 'helpers',
            location : 'helpers'
        }
    ]
    //  paths: 
        , paths: {
            'jquery' : 'vendor/jquery/dist/jquery',
            'jqueryui' : 'vendor/jquery.ui/ui/jquery.ui.core',
            'select2' : 'vendor/select2/select2',
            'backbone' : 'vendor/backbone-amd/backbone',
            'text' : 'vendor/requirejs-text/text',
            'rivets' : 'vendor/rivets/dist/rivets',
            'base64' : 'vendor/js-base64/base64',
            'foundation' : 'vendor/foundation/js/foundation/foundation',
            'modernizr' : 'vendor/modernizr/modernizr',
            'ckeditor' : 'vendor/ckeditor/ckeditor',
            'ckeditorAdapter' : 'vendor/ckeditor/adapters/jquery',
            'svg-edit-embed-api' : 'vendor/svg-edit-2.7/embedapi',
            'ace' : 'vendor/ace/lib/ace',
            'moment' : 'vendor/moment/moment',
            'scrollToFixed' : 'vendor/ScrollToFixed/jquery-scrolltofixed',
            'datetimepicker' : 'vendor/datetimepicker/jquery.datetimepicker',
            'sparkmd5' : 'vendor/sparkMD5/spark-md5',
            'router' : 'router',
            'alerts' : 'vendor/foundation/js/foundation/foundation.alert',
            'dropdown' : 'vendor/foundation/js/foundation/foundation.dropdown',
            'accordion' : 'vendor/jquery.ui/ui/jquery.ui.accordion',
            'tabs' : 'vendor/foundation/js/foundation/foundation.tab',
            'tooltip' : 'vendor/foundation/js/foundation/foundation.tooltip',
            'abide' : 'vendor/foundation/js/foundation/foundation.abide',
            'widgetFactory' : 'vendor/jquery.ui/ui/jquery.ui.widget',
            'mouseInteraction' : 'vendor/jquery.ui/ui/jquery.ui.mouse',
            'sortable' : 'vendor/jquery.ui/ui/jquery.ui.sortable',
            'validationLibrary' : 'validation/validationLibrary',
            'validationTypes' : 'validation/validationTypes',
            'validationAlpha' : 'validation/views/alpha/view',
            'validationAlphaConfig' : 'validation/views/alpha/config',
            'validationAlphaModel' : 'validation/views/alpha/model',
            'validationNumber' : 'validation/views/number/view',
            'validationNumberConfig' : 'validation/views/number/config',
            'validationNumberModel' : 'validation/views/number/model',
            'validationAlphaNumeric' : 'validation/views/alphaNumeric/view',
            'validationAlphaNumericConfig' : 'validation/views/alphaNumeric/config',
            'validationAlphaNumericModel' : 'validation/views/alphaNumeric/model',
            'validationDate' : 'validation/views/date/view',
            'validationDateConfig' : 'validation/views/date/config',
            'validationDateModel' : 'validation/views/date/model',
            'validationDateFormatters' : 'validation/views/date/formatters',
            'validationDatetime' : 'validation/views/datetime/view',
            'validationDatetimeConfig' : 'validation/views/datetime/config',
            'validationDatetimeModel' : 'validation/views/datetime/model',
            'validationDatetimeFormatters' : 'validation/views/datetime/formatters',
            'validationEmail' : 'validation/views/email/view',
            'validationEmailConfig' : 'validation/views/email/config',
            'validationEmailModel' : 'validation/views/email/model',
            'validationRegex' : 'validation/views/regex/view',
            'validationRegexConfig' : 'validation/views/regex/config',
            'validationRegexModel' : 'validation/views/regex/model',
            'validationUrl' : 'validation/views/url/view',
            'validationUrlConfig' : 'validation/views/url/config',
            'validationUrlModel' : 'validation/views/url/model',
            'validationRequired' : 'validation/views/required/view',
            'validationRequiredConfig' : 'validation/views/required/config',
            'validationRequiredModel' : 'validation/views/required/model',
            'mixins' : 'mixins',
            'grasshopperBaseView' : 'views/grasshopperBaseView',
            'addAssetsView' : 'views/addAssets/addAssetsView',
            'addAssetsViewConfig' : 'views/addAssets/addAssetsViewConfig',
            'addAssetsViewModel' : 'views/addAssets/addAssetsViewModel',
            'addContentView' : 'views/addContent/addContentView',
            'addContentViewConfig' : 'views/addContent/addContentViewConfig',
            'addContentViewModel' : 'views/addContent/addContentViewModel',
            'addFolderView' : 'views/addFolder/addFolderView',
            'addFolderViewConfig' : 'views/addFolder/addFolderViewConfig',
            'addFolderViewModel' : 'views/addFolder/addFolderViewModel',
            'addUser' : 'views/addUser',
            'alertBoxView' : 'views/alertBox/alertBoxView',
            'alertBoxViewConfig' : 'views/alertBox/alertBoxViewConfig',
            'alertBoxViewModel' : 'views/alertBox/alertBoxViewModel',
            'assetDetailView' : 'views/assetDetail/assetDetailView',
            'assetDetailViewConfig' : 'views/assetDetail/assetDetailViewConfig',
            'assetDetailViewModel' : 'views/assetDetail/assetDetailViewModel',
            'contentBrowseView' : 'views/contentBrowse/contentBrowseView',
            'contentBrowseViewConfig' : 'views/contentBrowse/contentBrowseViewConfig',
            'contentBrowseViewModel' : 'views/contentBrowse/contentBrowseViewModel',
            'contentBrowseViewChildNodesCollection' : 'views/contentBrowse/childNodesCollection',
            'contentDetailView' : 'views/contentDetail/contentDetailView',
            'contentDetailViewConfig' : 'views/contentDetail/contentDetailViewConfig',
            'contentDetailViewModel' : 'views/contentDetail/contentDetailViewModel',
            'contentDetailRowView' : 'views/contentDetail/contentDetailRow/view',
            'contentDetailRowViewConfig' : 'views/contentDetail/contentDetailRow/config',
            'contentDetailRowViewModel' : 'views/contentDetail/contentDetailRow/model',
            'contentTypeDetailView' : 'views/contentTypeDetail/contentTypeDetailView',
            'contentTypeDetailViewConfig' : 'views/contentTypeDetail/contentTypeDetailViewConfig',
            'contentTypeDetailViewModel' : 'views/contentTypeDetail/contentTypeDetailViewModel',
            'contentTypeDetailViewFieldsCollection' : 'views/contentTypeDetail/contentTypeDetailViewFieldsCollection',
            'contentTypeDetailRow' : 'views/contentTypeDetail/contentTypeDetailRow/view',
            'contentTypeDetailRowConfig' : 'views/contentTypeDetail/contentTypeDetailRow/config',
            'contentTypeDetailRowModel' : 'views/contentTypeDetail/contentTypeDetailRow/model',
            'contentTypeIndexView' : 'views/contentTypeIndex/contentTypeIndexView',
            'contentTypeIndexViewConfig' : 'views/contentTypeIndex/contentTypeIndexViewConfig',
            'contentTypeIndexViewModel' : 'views/contentTypeIndex/contentTypeIndexViewModel',
            'fieldAccordionView' : 'views/contentTypeDetail/fieldAccordion/view',
            'fieldAccordionConfig' : 'views/contentTypeDetail/fieldAccordion/config',
            'fieldAccordionModel' : 'views/contentTypeDetail/fieldAccordion/model',
            'fieldAccordionBinders' : 'views/contentTypeDetail/fieldAccordion/binders',
            'fieldAccordionValidationCollection' : 'views/contentTypeDetail/fieldAccordion/validationCollection',
            'fileBrowserView' : 'views/fileBrowser/fileBrowserView',
            'fileBrowserViewConfig' : 'views/fileBrowser/fileBrowserViewConfig',
            'fileBrowserViewModel' : 'views/fileBrowser/fileBrowserViewModel',
            'footerView' : 'views/footer/footerView',
            'footerViewConfig' : 'views/footer/footerViewConfig',
            'footerViewModel' : 'views/footer/footerViewModel',
            'headerView' : 'views/header/headerView',
            'headerViewConfig' : 'views/header/headerViewConfig',
            'headerViewModel' : 'views/header/headerViewModel',
            'loginView' : 'views/login/loginView',
            'loginViewConfig' : 'views/login/loginViewConfig',
            'loginViewModel' : 'views/login/loginViewModel',
            'mastheadView' : 'views/masthead/mastheadView',
            'mastheadViewConfig' : 'views/masthead/mastheadViewConfig',
            'mastheadViewModel' : 'views/masthead/mastheadViewModel',
            'mastheadViewBinders' : 'views/masthead/binders',
            'modalView' : 'views/modal/modalView',
            'modalViewConfig' : 'views/modal/modalViewConfig',
            'modalViewModel' : 'views/modal/modalViewModel',
            'modalViewBinders' : 'views/modal/binders',
            'nodeDetailView' : 'views/nodeDetail/nodeDetailView',
            'nodeDetailViewConfig' : 'views/nodeDetail/nodeDetailViewConfig',
            'nodeDetailViewModel' : 'views/nodeDetail/nodeDetailViewModel',
            'nodeTreeView' : 'views/nodeTree/nodeTreeView',
            'nodeTreeViewConfig' : 'views/nodeTree/nodeTreeViewConfig',
            'nodeTreeViewModel' : 'views/nodeTree/nodeTreeViewModel',
            'nodeTreeViewBinders' : 'views/nodeTree/nodeTreeViewBinders',
            'pagination' : 'views/pagination',
            'pluginWrapperView' : 'views/pluginWrapper/pluginWrapperView',
            'pluginWrapperViewConfig' : 'views/pluginWrapper/pluginWrapperViewConfig',
            'pluginWrapperViewModel' : 'views/pluginWrapper/pluginWrapperViewModel',
            'pluginWrapperViewCollection' : 'views/pluginWrapper/pluginCollection',
            'userDetail' : 'views/userDetail',
            'userDetailRow' : 'views/userDetail/userDetailRow',
            'userIndexView' : 'views/userIndex/userIndexView',
            'userIndexViewConfig' : 'views/userIndex/userIndexViewConfig',
            'userIndexViewModel' : 'views/userIndex/userIndexViewModel',
            'forbiddenView' : 'views/forbidden/forbiddenView',
            'forbiddenViewConfig' : 'views/forbidden/forbiddenViewConfig',
            'sysInfoView' : 'views/sysInfo/sysInfoView',
            'sysInfoViewConfig' : 'views/sysInfo/sysInfoViewConfig',
            'selfValidatingModel' : 'models/selfValidatingModel',
            'UserModel' : 'models/userModel',
            'grasshopperModel' : 'models/grasshopperModel',
            'pluginSetupModel' : 'views/contentTypeDetail/pluginSetupModel',
            'loginWorker' : 'workers/loginWorker',
            'logoutWorker' : 'workers/logoutWorker',
            'contentTypeWorker' : 'workers/contentTypeWorker',
            'ajaxCounterWorker' : 'workers/ajaxCounterWorker',
            'assetWorker' : 'workers/assetWorker',
            'breadcrumbWorker' : 'workers/breadcrumbWorker',
            'nodeWorker' : 'workers/nodeWorker',
            'urlWorker' : 'workers/urlWorker',
            'grasshopperCollection' : 'collections/grasshopperCollection',
            'paginatedCollection' : 'collections/paginatedCollection',
            'userCollection' : 'collections/userCollection',
            'api' : 'api/api',
            'plugins' : 'plugins',
            'appBinders' : 'appBinders',
            'pluginWrapperBinders' : 'views/pluginWrapper/pluginWrapperBinders',
            'contentTypeDetailBinders' : 'views/contentTypeDetail/contentTypeDetailBinders',
            'formatters' : 'formatters',
            'contentTypeDetailFormatters' : 'views/contentTypeDetail/contentTypeDetailFormatters',
            'resources' : 'resources',
            'constants' : 'constants'
        }
});

require([
    'backbone',
    'underscore',
    'jquery',
    'router',
    'constants',
    'ajaxCounterWorker',
    'alerts',
    'dropdown',
    'tabs',
    'tooltip',
    'abide',
    'modernizr',
    'sortable',
    'accordion',
    'scrollToFixed',
    'select2',
    'sparkmd5'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function (Backbone, _, $, Router, constants, ajaxCounterWorker) {
        'use strict';

        _.templateSettings = {
            evaluate : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape : /\[\[-(.+?)\]\]/g
        };

        ajaxCounterWorker.setupCounter();

        // TODO: For some reason this is not needed?
        $(document).foundation();

        new Router();
        Backbone.history.start();

        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
    });
