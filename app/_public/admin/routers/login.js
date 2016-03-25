/*global define*/
define([
        'jquery', 'backbone', 'underscore', 'masseuse', 'api', 'constants', 'helpers',
        'grasshopperBaseView',
        'login/view', 'loginWorker', 'logoutWorker', 'forbiddenView', 'notFoundView',
        'alertBoxView',
        'resources',
        'userDetail/view', 'UserModel',
        'headerView',
        'mastheadView'
    ],
    function($, Backbone, _, masseuse, Api, constants, helpers,
             GrasshopperBaseView,
             LoginView, loginWorker, logoutWorker, ForbiddenView, NotFoundView,
             AlertBoxView,
             resources,
             UserDetailView, UserModel,
             HeaderView,
             MastheadView
    ) {

        'use strict';
        var MasseuseRouter = masseuse.MasseuseRouter,
            LocalStorage = helpers.localStorage,
            userModel = new UserModel(),
            currentView,
            Router;

        /**
         * @class Router
         * @extends MasseuseRouter
         */
        Router = MasseuseRouter.extend({
            routes : {
                '(/:token)' : 'displayLogin',
                '*path' : 'goHome'
            },

            breadcrumb  : [],

            user : userModel,
            initialize : initialize,
            startHeader : startHeader,
            removeHeader : removeHeader,

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login(/:token)', 'logout'],
            userHasBreadcrumbs : userHasBreadcrumbs,
            removeThisRouteFromBreadcrumb : removeThisRouteFromBreadcrumb,
            getCurrentBreadcrumb : getCurrentBreadcrumb,

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,
            navigateBack : navigateBack,
            navigateNotFound : navigateNotFound,

            loadMainContent : loadMainContent,

            goHome : goHome,
            displayLogin : displayLogin,
            goLogout : goLogout,
            navigate : navigate
        });

        function onRouteFail() {
            this.goLogout();
        }

        function beforeRouting() {
            var $deferred = new $.Deferred();
            $deferred.resolve();
            return $deferred.promise();
        }

        function userHasBreadcrumbs() {
            return (this.breadcrumb && this.breadcrumb.length > 1);
        }

        function removeThisRouteFromBreadcrumb() {
            this.breadcrumb.pop();
        }

        function getCurrentBreadcrumb() {
            return _.last(this.breadcrumb);
        }

        function _handleRoutingFromRefreshOnModalView(nodeId) {
            if(nodeId === '0') {
                nodeId = null;
                this.breadcrumb.unshift(constants.internalRoutes.content);
            } else {
                this.breadcrumb.unshift(constants.internalRoutes.nodeDetail.replace(':id', nodeId));
            }
            this.displayContentBrowse(nodeId);
        }

        function navigateTrigger(fragment, options, doBeforeRender) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options, doBeforeRender);
        }

        function navigateNinja(fragment, options) {
            options = options || {};
            options.replace = true;
            this.navigate(fragment, options);
        }

        function navigateDeferred(fragment, options) {
            options = options || {};
            options.deferred = true;
            this.navigate(fragment, options);
        }

        function navigateNotFound() {
            this.navigate(constants.internalRoutes.notFound, { trigger : true });
        }

        function navigateBack(trigger) {
            if (trigger) {
                this.navigateTrigger(this.breadcrumb[this.breadcrumb.length - 1]);
            } else {
                this.navigateNinja(this.breadcrumb[this.breadcrumb.length - 1]);
            }
        }

        function navigate(fragment, options, doBeforeRender) {
            if (currentView instanceof Backbone.View) {
                currentView.hideAlertBox.call(currentView);
            }
            if (doBeforeRender) {
                this.beforeRouting();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);
        }

        function initialize() {
            MasseuseRouter.prototype.initialize.apply(this, arguments);

            GrasshopperBaseView.prototype.channels.addChannel('views');

            GrasshopperBaseView.prototype.app = {
                router : this,
                user : this.user
            };
        }

        function loadMainContent(ViewType, config, bypass) {
            var $deferred = new $.Deferred(),
                newView = new ViewType(config);

            config = config || {};

            if (currentView && currentView.name === config.name && !bypass) {
                return $deferred.resolve(currentView)
                    .promise();
            }

            newView.on(GrasshopperBaseView.beforeRenderDone, function() {
                if (currentView) {
                    currentView.remove();
                }
                currentView = newView;
                $('#mastheadButtons').empty();
            });

            newView.start()
                .done(function () {
                    $deferred.resolve(newView);
                    helpers.browserTitles.setBrowserTitle(newView.browserTitle);
                })
                .fail(function () {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function startHeader() {
            this.headerView = new HeaderView({
                modelData : {
                    userModel : this.user
                }
            });
            this.headerView.start();
            this.mastheadView = new MastheadView();
            this.mastheadView.start();
        }

        function removeHeader() {
            if (this.headerView && this.mastheadView) {
                this.headerView.remove();
                this.mastheadView.remove();
                this.headerView = null;
                this.mastheadView = null;
            }
        }

        function goLogout() {
            logoutWorker.doLogout.call(this)
                .done(function() {
                    window.location = constants.internalRoutes.login;
                });
        }

        function displayLogin(token) {
            var redirect = LocalStorage.get(constants.loginRedirectKey);

            if(token) {
                if (token.split('=')[0] == 'error') {
                    this.loadMainContent(LoginView, {modelData : {
                        oauthError : token.split('=')[1]
                    }});
                }
                // I am assuming this is a google token because that is all we support right meow.
                LocalStorage.set('authToken', 'Google '+ token);

                // Check if we have anything in localstorage telling us to redirect somewhere else after login
                if (redirect && redirect !== undefined) {
                    LocalStorage.remove(constants.loginRedirectKey)
                        .done(this.navigateTrigger.bind(this, redirect));
                } else  {
                    this.navigateTrigger(constants.internalRoutes.content);
                }

            } else {
                this.loadMainContent(LoginView);
            }

        }

        function goHome() {
            this.navigate(constants.internalRoutes.content, {trigger:true});
        }

        return Router;
    });
