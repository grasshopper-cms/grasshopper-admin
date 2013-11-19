/*global define*/
define([
    'backbone', 'underscore', 'masseuseRouter', 'api', 'constants', 'LocalStorage',
    'baseView',
    'loginView', 'loginViewConfig', 'loginWorker',
    'dashboardView', 'dashboardViewConfig',
    'emptyView', 'emptyViewConfig',
    'alertBoxView', 'alertBoxViewConfig',
    'resources',
    'userDetailView', 'userDetailViewConfig', 'userWorker', 'UserModel',
    'headerView', 'headerViewConfig',
    'mastheadView', 'mastheadViewConfig',
    'usersIndexView', 'usersIndexViewConfig',
    'addUserView', 'addUserViewConfig',
    'contentIndexView', 'contentIndexViewConfig',
    'contentEditView', 'contentEditViewConfig',
    'contentTypeIndexView', 'contentTypeIndexViewConfig',
    'contentTypeDetailView', 'contentTypeDetailViewConfig'
],
    function (Backbone, _, MasseuseRouter, Api, constants, LocalStorage,
              BaseView,
              LoginView, loginViewConfig, loginWorker,
              DashboardView, dashboardViewConfig,
              EmptyView, emptyViewConfig,
              AlertBoxView, alertBoxViewConfig,
              resources,
              UserDetailView, userDetailViewConfig, userWorker, UserModel,
              HeaderView, headerViewConfig,
              MastheadView, mastheadViewConfig,
              UsersIndexView, usersIndexViewConfig,
              AddUserView, addUserViewConfig,
              ContentIndexView, contentIndexViewConfig,
              ContentEditView, contentEditViewConfig,
              ContentTypeIndexView, contentTypeIndexViewConfig,
              ContentTypeDetailView, contentTypeDetailViewConfig
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
                'items(/nodeid/:number)': 'displayContentIndex',
                'item/:id' : 'displayContentEdit',
                '*path' : 'goHome'
            },

            initialize : initialize,
            startHeader : startHeader,
            removeHeader : removeHeader,

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            verifyAuthToken : verifyAuthToken,
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
            displayContentIndex : displayContentIndex,
            displayContentEdit : displayContentEdit,
            displayContentTypeIndex : displayContentTypeIndex,
            displayContentTypeDetail : displayContentTypeDetail
        });

        function onRouteFail () {
            this.goLogout();
        }

        // TODO: Rip this apart....figure out what it is doing.
        function beforeRouting () {
            var $deferred = new $.Deferred(),
                self = this;

            if (LocalStorage.get('authToken')) {
                if (!this.user.get('_id')) {
                    Api.authenticateToken(LocalStorage.get('authToken'))
                        .done(function (data) {
                            // TODO: put this in the user Model. Get it out of the Router. (THIS IS DUPLICATED IN THE loginViewWorker)
                            self.user.set({
                                _id : data._id,
                                email : data.email,
                                enabled : data.enabled,
                                login : data.login,
                                firstName : data.firstname,
                                lastName : data.lastname,
                                role : data.role
                            });
                            if ( ! self.headerView) {
                                self.startHeader();
                            }
                            $deferred.resolve();
                        })
                        .fail(function () {
                            self.goLogout();
                            $deferred.reject();
                        });
                } else {
                    verifyAuthToken($deferred);
                    if ( ! self.headerView) {
                        self.startHeader();
                    }
                    $deferred.resolve();
                }
            } else {
                self.removeHeader();
                $deferred.reject();
            }
            return $deferred.promise();
        }

        function verifyAuthToken($deferred) {
            Api.authenticateToken(LocalStorage.get('authToken'))
                .error(function() {
                    console.log('verifyAuthTokenFired');
                    $deferred.reject();
                    goLogout();
                });
        }

        function navigateTrigger (fragment, options) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options);
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

        function displayContentIndex(nodeId, pageNumber, pageLimit) {
            loadMainContent(ContentIndexView, contentIndexViewConfig, true);
        }

        function displayContentEdit(id) {
            loadMainContent(ContentEditView, contentEditViewConfig, true);
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

        return Router;
    });