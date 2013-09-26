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
    'headerViewConfig'
],
    function (
        Backbone,
        LoginView,
        loginViewConfig,
        Api,
        loginWorker,
        userWorker,
        EmptyView,
        emptyViewConfig,
        _,
        BaseView,
        UserModel,
        AlertBoxView,
        alertBoxViewConfig,
        resources,
        UserDetailView,
        userDetailViewConfig,
        HeaderView,
        headerViewConfig) {

        var userModel = new UserModel(),
            currentView;

        /**
         * @class Router
         * @extends Backbone.Router
         */
        var Router = Backbone.Router.extend({
            initialize: initialize,
            start: start,

            routes : {
                "login" : "displayLogin",
                "user/:id" : "displayUserDetail",
                "home" : "displayApp"
            },

            displayApp: displayApp,
            displayLogin: displayLogin,
            displayUserDetail: displayUserDetail,
            user : userModel,
            navigate: function () {
                if (currentView && currentView.destroy) {
                    currentView.destroy();
                }

                Backbone.Router.prototype.navigate.apply(this, arguments);
            }
        });

        function initialize() {
            BaseView.prototype.app = {
                router : this,
                user : this.user
            };
            BaseView.prototype.displayAlertBox = function displayAlertBox(msg) {
                var alertBoxView = new AlertBoxView(alertBoxViewConfig);
                alertBoxView.model.set('error', msg);
                alertBoxView.start();
                alertBoxView.rivetView();
            };
        }

        function start() {
            var headerView,
                self = this;

            Api.authenticateToken(localStorage.authToken)
                .done(function () {
                    self.navigate("home", {trigger: true});
                })
                .fail(function () {
                    self.navigate("login", {trigger: true});
                });

            headerView = new HeaderView(headerViewConfig);
            headerView.start();
            headerView.rivetView();
            currentView = headerView;

            return this;
        }

        function displayLogin () {
            var loginView = new LoginView(loginViewConfig);
            loginView.start();
            loginView.rivetView();
            currentView = loginView;
        }

        function displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(userModel);
            // Display the app.
            var emptyView = new EmptyView(emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();

            currentView = emptyView;
        }

        function displayUserDetail(id) {
            userWorker.getProfileData(userModel, id)
                .done(function(data) {
                    var userDetailView = new UserDetailView(userDetailViewConfig);
                    userDetailView.start();
                    userDetailView.rivetView();
                    userDetailView.model.set(data);
                })
                .fail(function(xhr) {
                    BaseView.prototype.displayAlertBox(resources.user.errors[xhr.status]);
                });
        }

        return Router;
    });