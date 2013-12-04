/*global define*/
define([
    'backbone', 'underscore', 'masseuseRouter', 'api', 'constants', 'LocalStorage',
    'baseView',
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
    'addFolderView', 'addFolderViewConfig'
],
    function (Backbone, _, MasseuseRouter, Api, constants, LocalStorage,
              BaseView,
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
              AddFolderView, addFolderViewConfig
              ) {

        var userModel = new UserModel(),
            currentView,
            ignoreFromTimer = [
                'loginView'
            ];

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
                'items(/nodeid/:nodeId)': 'displayContentBrowse',
                'item/:id' : 'displayContentDetail',
                'createFolder(/:id)' : 'displayCreateFolder',
                '*path' : 'goHome'
            },

            initialize : initialize,
            startHeader : startHeader,
            removeHeader : removeHeader,

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login', 'logout'],

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

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
            displayCreateFolder : displayCreateFolder
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

            BaseView.prototype.app = {
                router : this,
                user : this.user
            };
            BaseView.prototype.displayAlertBox = displayAlertBox;
            BaseView.prototype.displayTemporaryAlertBox = displayTemporaryAlertBox;
            BaseView.prototype.hideAlertBox = hideAlertBox;

            BaseView.prototype.displayModal = displayModal;
            BaseView.prototype.hideModal = hideModal;

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
                newView = new ViewType(config),
                self = this;

            if(currentView && ! _.contains(ignoreFromTimer, currentView.options.name)) {
//                spinnerTimer($deferred, newView);
            }

            if (currentView && currentView.options.name === config.name && !bypass) {
                return $deferred.resolve(currentView)
                    .promise();
            }

            newView.start()
                .progress(function (event) {
                    switch (event) {
                        case BaseView.beforeRenderDone:
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

        function displayAlertBox (msg, status) {
            var alertBoxView = new AlertBoxView(_.extend(alertBoxViewConfig, {
                modelData: {
                    msg: msg,
                    status: (status)
                }
            }));
            this.hideAlertBox();
            alertBoxView.start();
            BaseView.prototype.alertBoxView = alertBoxView;
        }

        function displayTemporaryAlertBox(msg, status) {
            var self = this;
            self.displayAlertBox(msg, status);
            setTimeout(function() {
                self.hideAlertBox();
            }, 5000);
        }

        function hideAlertBox() {
            if (BaseView.prototype.alertBoxView && BaseView.prototype.alertBoxView.remove) {
                BaseView.prototype.alertBoxView.remove();
            }
        }

        function displayModal (msg, type, data) {
            var $deferred = new $.Deferred();
            var modalView = new ModalView(_.extend(modalViewConfig, {
                modelData: {
                    msg: msg,
                    data: (data) ? data : null
                },
                type: type,
                $deferred : $deferred
            }));
            this.hideModal();
            modalView.start();
            BaseView.prototype.modalView = modalView;
            return $deferred.promise();
        }

        function hideModal() {
            if (BaseView.prototype.modalView && BaseView.prototype.modalView.remove) {
                BaseView.prototype.modalView.remove();
            }
        }

        function goHome () {
            this.navigateTrigger('home');
        }

        function displayUserDetail (id) {
            // I did the role check here instead of in the config with permissions, this is because there are Admin's getting their own, Admins getting others, and others getting their own.
            if(this.user.get('role') === 'admin' || this.user.get('_id') === id) {
                loadMainContent(UserDetailView, _.extend(userDetailViewConfig,
                    {
                        modelData : {
                            id : id,
                            isAdmin : (this.user.get('role') === 'admin')
                        }
                    }));
            } else {
                this.navigateTrigger('home');
            }

        }

        function displayUsersIndex (pageNumber, pageLimit) {
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

        function displayCreateFolder(id) {
            var addFolderView = new AddFolderView(_.extend({}, addFolderViewConfig,
                {
                    modelData: {
                        nodeId : (id) ? id : null
                    }
                }
            ));
            addFolderView.start();
        }

        return Router;
    });