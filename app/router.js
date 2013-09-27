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
                'user/:id' : 'displayUserDetail',
                'home' : 'displayApp',
                'users' : 'displayUsersIndex'
            },

            navigateTrigger: navigateTrigger,
            navigateNinja: navigateNinja,
            navigateDeferred: navigateDeferred,

            displayApp : displayApp,
            displayLogin : displayLogin,
            displayUserDetail : displayUserDetail,
            user : userModel,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex
        });

        function navigateTrigger(fragment, options) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options);
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

        function navigate (fragment, options) {
            var self = this,
                args = arguments,
                $deferred;

            //TODO: this doesn't work
            if (options && options.async) {
                delete options.async;
                $deferred = new $.Deferred();
                $deferred.done(function() {
                    if (currentView && currentView.destroy) {
                        currentView.destroy();
                    }
                    Backbone.Router.prototype.navigate.apply(self, args);
                });
            } else {
                if (currentView && currentView.destroy) {
                    currentView.destroy();
                }
                Backbone.Router.prototype.navigate.apply(this, arguments);
            }

            return $deferred;
        }

        function initialize () {
            window.router = this;
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
        }

        function start () {
            var headerView,
                self = this;

            Api.authenticateToken(localStorage.authToken)
                .done(function () {
                    self.navigate('home', {trigger : true});
                })
                .fail(function () {
                    self.navigate('login', {trigger : true});
                });

            headerView = newView(HeaderView, headerViewConfig);
            headerView.start();
            headerView.rivetView();

            return this;
        }

        function displayLogin () {
            var loginView = newView(LoginView, loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(userModel);
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

        function displayUsersIndex () {
            var usersIndexView = newView(UsersIndexView, usersIndexViewConfig);
            usersIndexView.start();
            usersIndexView.rivetView();
        }

        function newView(ViewType, config) {
            currentView = new ViewType(config);
            return currentView;
        }

        return Router;
    });