/*global define*/
define([
    'jquery', 'backbone', 'underscore', 'masseuse', 'api', 'constants',
    'grasshopperBaseView',
    'loginView', 'loginWorker',
    'dashboardView',
    'alertBoxView',
    'modalView', 'modalViewConfig',
    'resources',
    'userDetailView', 'userWorker', 'UserModel',
    'headerView',
    'mastheadView',
    'usersIndexView',
    'addUserView',
    'contentBrowseView',
    'contentDetailView',
    'contentTypeIndexView',
    'contentTypeDetailView',
    'addFolderView',
    'addContentView',
    'addAssetsView',
    'helpers'
],
    function ($, Backbone, _, masseuse, Api, constants,
              GrasshopperBaseView,
              LoginView, loginWorker,
              DashboardView,
              AlertBoxView,
              ModalView, modalViewConfig,
              resources,
              UserDetailView, userWorker, UserModel,
              HeaderView,
              MastheadView,
              UsersIndexView,
              AddUserView,
              ContentBrowseView,
              ContentDetailView,
              ContentTypeIndexView,
              ContentTypeDetailView,
              AddFolderView,
              AddContentView,
              AddAssetsView,
              helpers) {

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
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'home' : 'displayApp',
                'users(/page/:pageNumber/show/:pageLimit)' : 'displayUsersIndex',
                'user/:id' : 'displayUserDetail',
                'addUser' : 'displayAddUser',
                'item/types' : 'displayContentTypeIndex',
                'item/types/new' : 'displayContentTypeDetail',
                'item/types(/:id)' : 'displayContentTypeDetail',
                'items/nodeid/:nodeId/createAssets' : 'displayCreateAssets',
                'items/nodeid/:nodeId/createFolder' : 'displayCreateFolder',
                'items/nodeid/:nodeId/createContent' : 'displayCreateContent',
                'items(/nodeid/:nodeId)' : 'displayContentBrowse',
                'item/:id' : 'displayContentDetail',
                '*path' : 'goHome'
            },

            user : userModel,
            initialize : initialize,
            startHeader : startHeader,
            removeHeader : removeHeader,

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login', 'logout'],
            userHasBreadcrumbs : userHasBreadcrumbs,
            removeThisRouteFromBreadcrumb : removeThisRouteFromBreadcrumb,

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,
            navigateBack : navigateBack,

            loadMainContent : loadMainContent,

            goHome : goHome,
            displayApp : displayApp,
            displayLogin : displayLogin,
            goLogout : goLogout,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex,
            displayUserDetail : displayUserDetail,
            displayAddUser : displayAddUser,
            displayContentBrowse : displayContentBrowse,
            displayContentDetail : displayContentDetail,
            displayContentTypeIndex : displayContentTypeIndex,
            displayContentTypeDetail : displayContentTypeDetail,
            displayCreateFolder : displayCreateFolder,
            displayCreateContent : displayCreateContent,
            displayCreateAssets : displayCreateAssets
        });

        function onRouteFail () {
            this.goLogout();
        }

        function beforeRouting () {
            var $deferred = new $.Deferred();

            if (this.mastheadView) {
                this.mastheadView.model.set(
                    {
                        nodesCount : null,
                        filesCount : null,
                        itemsCount : null
                    }
                );
            }

            loginWorker.userIsStillValidUser.call(this, $deferred);

            return $deferred.promise();
        }

        function userHasBreadcrumbs () {
            return (this.breadcrumb && this.breadcrumb.length !== 0);
        }

        function removeThisRouteFromBreadcrumb () {
            this.breadcrumb.pop();
        }

        function _handleRoutingFromRefreshOnModal (nodeId) {
            this.breadcrumb.push(Backbone.history.fragment);
            if(nodeId === '0') {
                nodeId = null;
                this.breadcrumb.unshift(constants.internalRoutes.content.replace('#', ''));
            } else {
                this.breadcrumb.unshift(constants.internalRoutes.nodeDetail.replace(':id', nodeId).replace('#', ''));
            }
            this.displayContentBrowse(nodeId);
        }

        function navigateTrigger (fragment, options, doBeforeRender) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options, doBeforeRender);
        }

        function navigateNinja (fragment, options) {
            options = options || {};
            options.replace = true;
            this.navigate(fragment, options);
        }

        function navigateDeferred (fragment, options) {
            options = options || {};
            options.deferred = true;
            this.navigate(fragment, options);
        }

        function navigateBack (trigger) {
            if (trigger) {
                this.navigateTrigger(this.breadcrumb[this.breadcrumb.length - 1]);
            } else {
                this.navigateNinja(this.breadcrumb[this.breadcrumb.length - 1]);
            }
        }

        function navigate (fragment, options, doBeforeRender) {
            if (currentView instanceof Backbone.View) {
                currentView.hideAlertBox.call(currentView);
            }
            if (doBeforeRender) {
                this.beforeRouting();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);
        }

        function initialize () {
            MasseuseRouter.prototype.initialize.apply(this, arguments);

            GrasshopperBaseView.prototype.channels.addChannel('views');

            GrasshopperBaseView.prototype.app = {
                router : this,
                user : this.user
            };
            GrasshopperBaseView.prototype.displayAlertBox = displayAlertBox;
            GrasshopperBaseView.prototype.displayTemporaryAlertBox = displayTemporaryAlertBox;
            GrasshopperBaseView.prototype.hideAlertBox = hideAlertBox;

            GrasshopperBaseView.prototype.displayModal = displayModal;
            GrasshopperBaseView.prototype.hideModal = hideModal;

        }

        function loadMainContent (ViewType, config, bypass) {
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
            });

            newView.start()
                .done(function () {
                    $deferred.resolve(newView);
                })
                .fail(function () {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function startHeader () {
            this.headerView = new HeaderView({
                modelData : {
                    userModel : this.user
                }
            });
            this.headerView.start();
            this.mastheadView = new MastheadView();
            this.mastheadView.start();
        }

        function removeHeader () {
            if (this.headerView && this.mastheadView) {
                this.headerView.remove();
                this.mastheadView.remove();
                this.headerView = null;
                this.mastheadView = null;
            }
        }

        function goLogout () {
            var self = this;
            LocalStorage.remove('authToken')
                .done(function () {
                    self.user.clear();
                    self.navigate('login', {trigger : true}, true);
                });
        }

        function displayLogin () {
            loadMainContent(LoginView);
        }

        function displayApp () {
            loadMainContent(DashboardView, {
                modelData : {
                    userModel : this.user
                }
            });
        }

        function displayAlertBox (options) {
            var alertBoxView = new AlertBoxView({
                    modelData : {
                        msg : (options.msg),
                        status : (options.status)
                    },
                    temporary : options.temporary
                });
            alertBoxView.start();
        }

        function displayTemporaryAlertBox (options) {
            options.temporary = true;
            this.displayAlertBox(options);
        }

        function hideAlertBox () {
            this.channels.views.trigger('hideAlertBoxes');
        }

        function displayModal (options) {
            var $deferred = new $.Deferred(),
                modalView = new ModalView({
                    modelData : {
                        header : (options.header) ? options.header : null,
                        msg : options.msg,
                        data : (options.data) ? options.data : null
                    },
                    type : (options.type) ? options.type : null,
                    $deferred : $deferred
                });
            this.hideModal();
            modalView.start();
            GrasshopperBaseView.prototype.modalView = modalView;
            return $deferred.promise();
        }

        function hideModal () {
            if (GrasshopperBaseView.prototype.modalView && GrasshopperBaseView.prototype.modalView.remove) {
                GrasshopperBaseView.prototype.modalView.remove();
            }
        }

        function goHome () {
            this.navigateTrigger('home');
        }

        function displayUserDetail (id) {
            // I did the role check here instead of in the config with permissions, this is because there are Admin's
            // getting their own, Admins getting others, and others getting their own.
            if (this.user.get('role') === 'admin' || this.user.get('_id') === id) {
                loadMainContent(UserDetailView, {
                        modelData : {
                            _id : id,
                            userModel : this.user
                        }
                    });
            } else {
                this.navigateTrigger('home');
            }
        }

        function displayUsersIndex (pageNumber, pageLimit) {
            loadMainContent(UsersIndexView, {
                    modelData : {
                        pageNumber : pageNumber,
                        pageLimit : pageLimit
                    }
                });
        }

        function displayAddUser () {
            loadMainContent(AddUserView);
        }

        function displayContentBrowse (nodeId) {
            this.contentBrowserNodeId = nodeId;
            loadMainContent(ContentBrowseView, {
                    modelData : {
                        nodeId : nodeId ? nodeId : 0
                    }
                });
        }

        function displayContentDetail (id) {
            loadMainContent(ContentDetailView, {
                    modelData : {
                        _id : id
                    }
                });
        }

        function displayContentTypeIndex () {
            loadMainContent(ContentTypeIndexView);
        }

        function displayContentTypeDetail (id) {
            loadMainContent(ContentTypeDetailView, {
                    modelData : {
                        _id : id
                    }
                });
        }

        function displayCreateFolder (nodeId) {
            if (!this.userHasBreadcrumbs()) {
                _handleRoutingFromRefreshOnModal.call(this, nodeId);
            }
            var addFolderView = new AddFolderView({
                    modelData : {
                        nodeId : (nodeId) ? nodeId : null
                    }
                });
            addFolderView.start();
        }

        function displayCreateContent (nodeId) {
            if (!this.userHasBreadcrumbs()) {
                _handleRoutingFromRefreshOnModal.call(this, nodeId);
            }
            loadMainContent(AddContentView, {
                    modelData : {
                        node : {
                            _id : nodeId
                        }
                    }
                });
        }

        function displayCreateAssets (nodeId) {
            if (!this.userHasBreadcrumbs()) {
                _handleRoutingFromRefreshOnModal.call(this, nodeId);
            }
            var addAssetsView = new AddAssetsView({
                    modelData : {
                        nodeId : nodeId
                    }
                });
            addAssetsView.start();
        }

        return Router;
    });