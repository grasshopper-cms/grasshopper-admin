/*global define*/
define([
    'backbone',
    'masseuseRouter',
    'loginView',
    'loginViewConfig',
    'dashboardView',
    'dashboardViewConfig',
    'api',
    'loginWorker',
    'userWorker',
    'emptyView',
    'emptyViewConfig',
    'underscore',
    'baseView',
    'UserModel',
    'alertBoxView',
    'alertBoxViewConfig',
    'resources',
    'userDetailView',
    'userDetailViewConfig',
    'headerView',
    'headerViewConfig',
    'mastheadView',
    'mastheadViewConfig',
    'usersIndexView',
    'usersIndexViewConfig',
    'constants',
    'LocalStorage'
],
    function (Backbone, MasseuseRouter, LoginView, loginViewConfig, DashboardView, dashboardViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, _, BaseView, UserModel, AlertBoxView, alertBoxViewConfig, resources, UserDetailView, userDetailViewConfig, HeaderView, headerViewConfig, MastheadView, mastheadViewConfig, UsersIndexView, usersIndexViewConfig, constants, LocalStorage) {

        var userModel = new UserModel(),
            currentView;

        /**
         * @class Router
         * @extends MasseuseRouter
         */
        var Router = MasseuseRouter.extend({
            initialize : initialize,
            start : start,

            routes : {
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'user/:id' : 'displayUserDetail',
                'home' : 'displayApp',
                'users(/page/:number)(/show/:limit)' : 'displayUsersIndex',
                '*path' : 'goHome'
            },

            onRouteFail : onRouteFail,
            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login'],

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

            goHome : goHome,
            displayApp : displayApp,
            displayLogin : displayLogin,
            goLogout : goLogout,
            displayUserDetail : displayUserDetail,
            user : userModel,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex
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
                            $deferred.resolve();
                        })
                        .fail(function () {
                            $deferred.reject();
                        });
                } else {
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
            var self = this,
                oldSave = Backbone.Model.prototype.save,
                oldSet = Backbone.Collection.prototype.set;

            MasseuseRouter.prototype.initialize.apply(this, arguments);

            // TODO: remove after getting userDetailViewModel sorted out
            window.router = this;

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

        function start () {
            var self = this;

            var headerView = newView(HeaderView, headerViewConfig);
            headerView.start();
            headerView.rivetView();

            var mastheadView = newView(MastheadView, mastheadViewConfig);
            mastheadView.start();
            mastheadView.rivetView();

            return this;
        }

        function goLogout () {
            LocalStorage.remove('authToken');
            this.user.clear();
            this.navigate('login', {trigger : true});
        }

        function displayLogin () {

            var loginView = newView(LoginView, loginViewConfig);
            loginView.start();
            loginView.rivetView();
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
                    userDetailView.rivetView();
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

            usersIndexView.start();
            usersIndexView.goToPage(pageNumber || defaultPage, pageLimit || defaultLimit);

            if (pageNumber) {
                usersIndexView.goToPage(pageNumber);
            } else {
                usersIndexView.goToPage(1);
            }
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