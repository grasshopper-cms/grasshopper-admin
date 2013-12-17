/*global define*/
define([
    'backbone', 'underscore', 'masseuse', 'api', 'constants',
    'grasshopperBaseView',
    'loginView', 'loginViewConfig', 'loginWorker',
    'dashboardView', 'dashboardViewConfig',
    'alertBoxView', 'alertBoxViewConfig',
    'modalView', 'modalViewConfig',
    'resources',
    'userDetailView', 'userDetailViewConfig', 'userWorker', 'UserModel',
    'headerView', 'headerViewConfig',
    'mastheadView', 'mastheadViewConfig',
    'usersIndexView', 'usersIndexViewConfig',
    'addUserView', 'addUserViewConfig',
    'contentBrowseView', 'contentBrowseViewConfig',
    'contentDetailView', 'contentDetailViewConfig',
    'contentTypeIndexView', 'contentTypeIndexViewConfig',
    'contentTypeDetailView', 'contentTypeDetailViewConfig',
    'addFolderView', 'addFolderViewConfig',
    'addContentView', 'addContentViewConfig',
    'addAssetsView', 'addAssetsViewConfig'
],
    function (Backbone, _, masseuse, Api, constants,
              GrasshopperBaseView,
              LoginView, loginViewConfig, loginWorker,
              DashboardView, dashboardViewConfig,
              AlertBoxView, alertBoxViewConfig,
              ModalView, modalViewConfig,
              resources,
              UserDetailView, userDetailViewConfig, userWorker, UserModel,
              HeaderView, headerViewConfig,
              MastheadView, mastheadViewConfig,
              UsersIndexView, usersIndexViewConfig,
              AddUserView, addUserViewConfig,
              ContentBrowseView, contentBrowseViewConfig,
              ContentDetailView, contentDetailViewConfig,
              ContentTypeIndexView, contentTypeIndexViewConfig,
              ContentTypeDetailView, contentTypeDetailViewConfig,
              AddFolderView, addFolderViewConfig,
              AddContentView, addContentViewConfig,
              AddAssetsView, addAssetsViewConfig
              ) {

        var MasseuseRouter = masseuse.MasseuseRouter,
            LocalStorage = masseuse.localStorage,
            userModel = new UserModel(),
            currentView;

        /**
         * @class Router
         * @extends MasseuseRouter
         */
        var Router = MasseuseRouter.extend({
            routes : {
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'home' : 'displayApp',
                'users(/page/:pageNumber/show/:pageLimit)' : 'displayUsersIndex',
                'user/:id' : 'displayUserDetail',
                'addUser' : 'displayAddUser',
                'item/types' : 'displayContentTypeIndex',
                'item/types(/:id)' : 'displayContentTypeDetail',
                'items/nodeid/:nodeId/createAssets' : displayCreateAssets,
                'items/nodeid/:nodeId/createFolder' : displayCreateFolder,
                'items/nodeid/:nodeId/createContent' : displayCreateContent,
                'items(/nodeid/:nodeId)': 'displayContentBrowse',
                'item/:id' : 'displayContentDetail',
                '*path' : 'goHome'
            },

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
            user : userModel,
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

        function userHasBreadcrumbs() {
            return (this.breadcrumb && this.breadcrumb.length !== 0);
        }

        function removeThisRouteFromBreadcrumb() {
            this.breadcrumb.pop();
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

        function navigateBack() {
            this.navigateNinja(this.breadcrumb[this.breadcrumb.length - 2]);
        }

        function navigate (fragment, options, doBeforeRender) {
            // TODO: Move in to masseuse parts that we can
            if (currentView instanceof Backbone.View) {
                // (and override destroy in GH to remove alerts)
                currentView.hideAlertBox();
            }
            if(doBeforeRender) {
                this.beforeRouting();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);
        }

        function initialize () {
            var oldSet = Backbone.Collection.prototype.set;

            MasseuseRouter.prototype.initialize.apply(this, arguments);

            GrasshopperBaseView.prototype.app = {
                router : this,
                user : this.user
            };
            GrasshopperBaseView.prototype.displayAlertBox = displayAlertBox;
            GrasshopperBaseView.prototype.displayTemporaryAlertBox = displayTemporaryAlertBox;
            GrasshopperBaseView.prototype.hideAlertBox = hideAlertBox;

            GrasshopperBaseView.prototype.displayModal = displayModal;
            GrasshopperBaseView.prototype.hideModal = hideModal;

            // TODO: Get rid of this. Move it to a grasshopperCollection or something like that. It does not belong here.
            Backbone.Collection.prototype.set = function(data, options) {
                if (data && data.results) {
                    data = data.results;
                }
                oldSet.call(this, data, options);
            };
        }

        function loadMainContent (ViewType, config, bypass) {
            var $deferred = new $.Deferred(),
                newView = new ViewType(config);

            if (currentView && currentView.options.name === config.name && !bypass) {
                return $deferred.resolve(currentView)
                    .promise();
            }

            newView.start()
                .progress(function (event) {
                    switch (event) {
                        case GrasshopperBaseView.beforeRenderDone:
                            if (currentView) {
                                currentView.remove();
                            }

                            currentView = newView;
                            break;
                    }
                })
                .done(function () {
                    $deferred.resolve(newView);
                })
                .fail(function () {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function startHeader () {
            this.headerView = new HeaderView(headerViewConfig);
            this.headerView.start();
            this.mastheadView = new MastheadView(mastheadViewConfig);
            this.mastheadView.start();
        }

        function removeHeader () {
            if(this.headerView && this.mastheadView) {
                this.headerView.remove();
                this.mastheadView.remove();
                this.headerView = null;
                this.mastheadView = null;
            }
        }

        function goLogout () {
            var self = this;
            LocalStorage.remove('authToken')
                .done(function() {
                    self.user.clear();
                    self.navigate('login', {trigger : true}, true);
                });
        }

        function displayLogin () {
            loadMainContent(LoginView, loginViewConfig, true);
        }

        function displayApp () {
            loadMainContent(DashboardView, dashboardViewConfig, true);
        }

        function displayAlertBox (options) {
            var alertBoxView = new AlertBoxView(_.extend(alertBoxViewConfig, {
                modelData: {
                    msg: (options.msg),
                    status: (options.status)
                }
            }));
            this.hideAlertBox();
            alertBoxView.start();
            GrasshopperBaseView.prototype.alertBoxView = alertBoxView;
        }

        function displayTemporaryAlertBox(options) {
            var self = this;
            self.displayAlertBox(options);
            setTimeout(function() {
                self.hideAlertBox();
            }, 5000);
        }

        function hideAlertBox() {
            if (GrasshopperBaseView.prototype.alertBoxView && GrasshopperBaseView.prototype.alertBoxView.remove) {
                GrasshopperBaseView.prototype.alertBoxView.remove();
            }
        }

        function displayModal (options) {
            var $deferred = new $.Deferred(),
                modalView = new ModalView(_.extend(modalViewConfig, {
                modelData: {
                    msg: options.msg,
                    data: (options.data) ? options.data : null
                },
                type: (options.type) ? options.type : null,
                $deferred : $deferred
            }));
            this.hideModal();
            modalView.start();
            GrasshopperBaseView.prototype.modalView = modalView;
            return $deferred.promise();
        }

        function hideModal() {
            if (GrasshopperBaseView.prototype.modalView && GrasshopperBaseView.prototype.modalView.remove) {
                GrasshopperBaseView.prototype.modalView.remove();
            }
        }

        function goHome () {
            this.navigateTrigger('home');
        }

        function displayUserDetail (id) {
            // TODO: I think this can be refactored to take advantage of the new permissions checking system.
            // I did the role check here instead of in the config with permissions, this is because there are Admin's getting their own, Admins getting others, and others getting their own.
            if(this.user.get('role') === 'admin' || this.user.get('_id') === id) {
                loadMainContent(UserDetailView, _.extend(userDetailViewConfig,
                    {
                        modelData : {
                            id : id,
                            // TODO: I think this can be removed considering the model now has access to the entire App.user
                            userModel: this.user.toJSON()
                        }
                    }));
            } else {
                this.navigateTrigger('home');
            }

        }

        function displayUsersIndex (pageNumber, pageLimit) {
            // TODO: Refactor this to take advantage of the permissions checking system.
            if (this.user.get('role') === 'admin') {
                loadMainContent(UsersIndexView, _.extend(usersIndexViewConfig,
                    {
                        modelData : {
                            pageNumber : pageNumber,
                            pageLimit : pageLimit
                        }
                    }), true);
            } else {
                this.navigateTrigger('home');
            }
        }

        function displayAddUser () {
            loadMainContent(AddUserView, addUserViewConfig);
        }

        function displayContentBrowse(nodeId) {
            this.contentBrowserNodeId = nodeId;
            loadMainContent(ContentBrowseView, _.extend({}, contentBrowseViewConfig,
                {
                    modelData: {
                        nodeId: nodeId
                    }
                }
            ), true);
        }

        function displayContentDetail(id) {
            loadMainContent(ContentDetailView, _.extend({}, contentDetailViewConfig,
                {
                    modelData : {
                        id : id
                    }
                }
            ), true);
        }

        function displayContentTypeIndex() {
            loadMainContent(ContentTypeIndexView, contentTypeIndexViewConfig);
        }

        function displayContentTypeDetail(id) {
            loadMainContent(ContentTypeDetailView, _.extend(contentTypeDetailViewConfig,
                {
                    modelData : {
                        id : id
                    }
                }));
        }

        function displayCreateFolder(nodeId) {
            var addFolderView = new AddFolderView(_.extend({}, addFolderViewConfig,
                {
                    modelData: {
                        nodeId : (nodeId) ? nodeId : null
                    }
                }
            ));
            addFolderView.start();
        }

        function displayCreateContent(nodeId) {
            var addContentView = new AddContentView(_.extend({}, addContentViewConfig,
                {
                    modelData: {
                        nodeId : (nodeId) ? nodeId : null
                    }
                }
            ));
            addContentView.start();
        }

        function displayCreateAssets(nodeId) {
            if (!this.userHasBreadcrumbs()) {
                this.displayContentBrowse(nodeId);
            }

            var addAssetsView = new AddAssetsView(_.extend({}, addAssetsViewConfig,
                {
                    modelData: {
                        nodeId : nodeId
                    }
                }
            ));
            addAssetsView.start();
        }

        return Router;
    });