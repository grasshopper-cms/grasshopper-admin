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

        var userModel = new UserModel();

        /**
         * @class Router
         * @extends Backbone.Router
         */
        var Router = Backbone.Router.extend({
            initialize: initialize,
            start: start,

            routes : {
                "" : "displayApp",
                "login" : "displayLogin",
                "user/:id" : "displayUserDetail"
            },

            displayApp: displayApp,
            displayLogin: displayLogin,
            displayUserDetail: displayUserDetail,
            user : userModel
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
                    console.log("done");
                    self.navigate("", {trigger: true});
                })
                .fail(function () {
                    self.navigate("login", {trigger: true});
                });

            headerView = new HeaderView(headerViewConfig);
            headerView.start();
            headerView.rivetView();

            return this;
        }

        function displayLogin () {
            var loginView = new LoginView(loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(userModel);
            // Display the app.
            var emptyView = new EmptyView(emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();
        }

        function displayUserDetail(id) {
            if(userWorker.isValidProfileEditor(userModel, id)) {
                userWorker.getRequestedUserDetails(id)
                    .done(function(data) {
                        var userDetailView = new UserDetailView(userDetailViewConfig);
                        userDetailView.start();
                        userDetailView.model.set(data);
                        userDetailView.rivetView();
                    })
                    .fail(function(xhr) {
                        // TODO: Better error handling here.
                        console.log(xhr);
                    });
            } else {
                this.displayAlertBox(resources.user.errors.insufficientPrivileges);
            }
        }

        return Router;
    });