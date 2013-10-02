/*global define*/
define([
    'backbone',
    'loginView',
    'loginViewConfig',
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
    'usersIndexView',
    'usersIndexViewConfig'
],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, _, BaseView, UserModel, AlertBoxView, alertBoxViewConfig, resources, UserDetailView, userDetailViewConfig, HeaderView, headerViewConfig, UsersIndexView, usersIndexViewConfig) {

        var userModel = new UserModel(),
            currentView;

        /**
         * @class Router
         * @extends Backbone.Router
         */
        var Router = Backbone.Router.extend({
            initialize : initialize,
            start : start,

            routes : {
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'user/:id' : 'displayUserDetail',
                'home' : 'displayApp',
                'users(/page/:number)' : 'displayUsersIndex'
            },

            beforeRouting : beforeRouting,
            excludeFromBeforeRouting : ['login'],

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

            displayApp : displayApp,
            displayLogin : displayLogin,
            goLogout : goLogout,
            displayUserDetail : displayUserDetail,
            user : userModel,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex
        });

        if (Router.prototype.beforeRouting) {
            _(Router.prototype.routes).chain()
                .omit(Router.prototype.excludeFromBeforeRouting)
                .each(function (methodName) {
                    var oldMethod = Router.prototype[methodName];

                    Router.prototype[methodName] = function () {
                        var self = this,
                            args = arguments;

                        this.beforeRouting()
                            .done(function () {
                                oldMethod.apply(self, args);
                            })
                            .fail(function () {
                                self.navigateTrigger('login');
                            });
                    };
                });
        }

        function beforeRouting () {
            var $deferred = new $.Deferred(),
                self = this;

            if (localStorage.authToken) {

                if (!this.user.get('_id')) {
                    Api.authenticateToken(localStorage.authToken)
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

            if (currentView && currentView.destroy) {
                currentView.destroy();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);

        }

        function initialize () {
            // TODO: remove after getting userDetailViewModel sorted out
            window.router = this;
            var oldSet = Backbone.Collection.prototype.set;

            BaseView.prototype.app = {
                router : this,
                user : this.user
            };
            BaseView.prototype.displayAlertBox = function displayAlertBox (msg) {
                var alertBoxView = new AlertBoxView(alertBoxViewConfig);
                alertBoxView.model.set('error', msg);
                alertBoxView.start();
                alertBoxView.rivetView();
            };

            Backbone.Collection.prototype.set = function (data, options) {
                if (data && data.results) {
                    data = data.results;
                }
                oldSet.call(this, data, options);
            };

        }

        function start () {
            var self = this,
                headerView = newView(HeaderView, headerViewConfig);

            headerView.start();
            headerView.rivetView();

            return this;
        }

        function goLogout () {
            localStorage.authToken = '';
            this.user.clear();
            this.navigate('login', {trigger : true});
        }

        function displayLogin () {
            var loginView = newView(LoginView, loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function displayApp () {
            // Display the app.
            var emptyView = newView(EmptyView, emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();
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

        function displayUsersIndex (pageNumber) {
            var usersIndexView = newView(UsersIndexView, usersIndexViewConfig);
            usersIndexView.start();
            usersIndexView.rivetView();

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