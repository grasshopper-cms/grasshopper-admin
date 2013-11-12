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
    'contentIndexView', 'contentIndexViewConfig',
    'contentEditView', 'contentEditViewConfig'
],
    function (Backbone, _, MasseuseRouter, Api, constants, LocalStorage,
              BaseView,
              LoginView, loginViewConfig, loginWorker,
              DashboardView, dashboardViewConfig,
              EmptyView, emptyViewConfig,
              AlertBoxView, alertBoxViewConfig, resources,
              UserDetailView, userDetailViewConfig,userWorker, UserModel,
              HeaderView, headerViewConfig,
              MastheadView, mastheadViewConfig,
              UsersIndexView, usersIndexViewConfig,
              ContentIndexView, contentIndexViewConfig,
              ContentEditView, contentEditViewConfig
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
            initialize : initialize,
            startHeader : startHeader,

            routes : {
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'home' : 'displayApp',
                'users' : 'displayUsersIndex',
                'user/:id' : 'displayUserDetail',
                'items(/nodeid/:number)': 'displayContentIndex',
                'item/:id' : 'displayContentEdit',
                '*path' : 'goHome'
            },

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login'],

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

            loadMainContent : loadMainContent,

            goHome : goHome,
            displayApp : displayApp,
            displayLogin : displayLogin,
            goLogout : goLogout,
            displayUserDetail : displayUserDetail,
            user : userModel,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex,
            displayContentIndex : displayContentIndex,
            displayContentEdit : displayContentEdit
        });

        function onRouteFail () {
            this.navigateTrigger('login');
        }

        function beforeRouting () {
            var $deferred = new $.Deferred(),
                self = this;

            if (LocalStorage.get('authToken')) {

                if (!this.user.get('_id')) {
                    Api.authenticateToken(LocalStorage.get('authToken'))
                        .done(function (data) {
                            self.user.set({
                                _id : data._id,
                                email : data.email,
                                enabled : data.enabled,
                                login : data.login,
                                name : data.name,
                                password : data.password,
                                role : data.role
                            });
                            if ( ! self.headerView) {
                                self.startHeader();
                            }
                            $deferred.resolve();
                        })
                        .fail(function () {
                            $deferred.reject();
                        });
                } else {
                    if ( ! self.headerView) {
                        self.startHeader();
                    }
                    $deferred.resolve();
                }

            } else {
                $deferred.reject();
            }

            return $deferred.promise();
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

        function navigate (fragment, options) {
            // TODO: Move in to masseuse parts that we can
            if (currentView instanceof Backbone.View) {
                // (and override destroy in GH to remove alerts)
                currentView.hideAlertBox();
                // TODO: this breaks the ui
                //currentView.remove();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);

        }

        function initialize () {
            var oldSave = Backbone.Model.prototype.save,
                oldSet = Backbone.Collection.prototype.set;

            MasseuseRouter.prototype.initialize.apply(this, arguments);

            BaseView.prototype.app = {
                router : this,
                user : this.user
            };
            BaseView.prototype.displayAlertBox = displayAlertBox;
            BaseView.prototype.hideAlertBox = hideAlertBox;
            Backbone.Collection.prototype.set = function(data, options) {
                if (data && data.results) {
                    data = data.results;
                }
                oldSet.call(this, data, options);
            };
            Backbone.Model.prototype.save = function() {
                var saveOptions = {headers : {
                    'Authorization' : 'Token ' + LocalStorage.get('authToken')
                }};
                return oldSave.call(this, null, saveOptions);
            };
        }

        function loadMainContent (ViewType, config, bypass) {
            var $deferred = new $.Deferred(),
                newView = new ViewType(config);

            if(currentView && ! _.contains(ignoreFromTimer, currentView.options.name)) {
                spinnerTimer($deferred, newView);
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

            var headerView = newView(HeaderView, headerViewConfig);
            headerView.start();
            headerView.rivetView();
            this.headerView = headerView;

            var mastheadView = newView(MastheadView, mastheadViewConfig);
            mastheadView.model.set({title:'<small><a href="#">cms</a> / <a href="#">folder</a> /</small> Pages',icon: 'icon-file',description: '23 content items. 45 files.'});
            mastheadView.start();
            mastheadView.rivetView();
            this.mastheadView = mastheadView;

        }

        function goLogout () {
            LocalStorage.remove('authToken');
            this.user.clear();
            this.navigate('login', {trigger : true});
        }

        function displayLogin () {

            loadMainContent(LoginView, loginViewConfig, true)
                .done(function(view) {
                    if(view.options.rivetConfig) {
                        view.rivetView();
                    }
                })
                .fail(function() {

                });

//            var loginView = newView(LoginView, loginViewConfig);
//
//            if (this.headerView) {
//                this.headerView.remove();
//                this.headerView = false;
//            }
//
//            if (this.mastheadView) {
//                this.mastheadView.remove();
//                this.mastheadView = false;
//            }

//
//            loginView.start();
//            loginView.rivetView();
        }

        function displayAlertBox (msg) {
            var alertBoxView;
            this.hideAlertBox();
            alertBoxView = new AlertBoxView(alertBoxViewConfig);
            alertBoxView.model.set('error', msg);
            alertBoxView.start();
            alertBoxView.rivetView();
            BaseView.prototype.alertBoxView = alertBoxView;
        }

        function hideAlertBox() {
            if (BaseView.prototype.alertBoxView && BaseView.prototype.alertBoxView.remove) {
                BaseView.prototype.alertBoxView.remove();
            }
        }

        function goHome () {
            this.navigateTrigger('home');
        }

        function displayApp () {
            // Display the app.


            var dashboardView = newView(DashboardView, dashboardViewConfig);
            dashboardView.start();
            dashboardView.rivetView();

        }

        function displayUserDetail (id) {
            userWorker.getProfileData(userModel, id)
                .done(function (data) {
                    var userDetailView = newView(UserDetailView, userDetailViewConfig);
                    userDetailView.start();
                    userDetailView.model.set(data);
                })
                .fail(function (xhr) {
                    BaseView.prototype.displayAlertBox(resources.user.errors[xhr.status]);
                });
        }

        function displayUsersIndex (pageNumber, pageLimit) {
            var usersIndexView = newView(UsersIndexView, usersIndexViewConfig),
                defaultLimit = constants.userCollection.pageSize,
                defaultPage = constants.userCollection.page;

            usersIndexView.goToPage(pageNumber || defaultPage, pageLimit || defaultLimit)
            .done(function(){
                usersIndexView.start();
                usersIndexView.rivetView();
                usersIndexView.renderPlugins();
            });

        }

        function displayContentIndex (nodeId, pageNumber, pageLimit) {

            var contentIndexView = newView(ContentIndexView, contentIndexViewConfig);
            contentIndexView.start();
            contentIndexView.rivetView();

        }

        function displayContentEdit (id) {

            var contentEditView = newView(ContentEditView, contentEditViewConfig);
            contentEditView.start();
            contentEditView.rivetView();

        }


        function newView (ViewType, config, bypass) {
            if (currentView) {
                if (currentView.options.name !== config.name || bypass) {
                    currentView = new ViewType(config);
                }
            } else {
                currentView = new ViewType(config);
            }

            return currentView;
        }

        return Router;
    });