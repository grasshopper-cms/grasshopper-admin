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

        var Router = Backbone.Router.extend({
            initialize: initialize,
            start: start,
            displayUserDetail : displayUserDetail,
            displayAlertBox : displayAlertBox,

            routes : {
                "" : "root",
                "login" : "login",
                "user/:id" : "userDetail"
            },

            root : function () {
                console.log("root!");
                _displayApp.call(this);
            },

            login : function () {
                console.log("login!");
                _displayLogin.call(this);
            },

            userDetail : function(id) {
                _displayUserDetail.call(this, id);
            },
            user : userModel
        });

        function initialize() {
            BaseView.prototype.app = {
                router : this,
                user : this.user
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
                    console.log("fail");
                    self.navigate("login", {trigger: true});
                });

            headerView = new HeaderView(headerViewConfig);
            headerView.start();
            headerView.rivetView();

            return this;
        }

        function _displayLogin () {
            var loginView = new LoginView(loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function _displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(userModel);
            // Display the app.
            var emptyView = new EmptyView(emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();
        }

        function _displayUserDetail(id) {
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

        function displayAlertBox(msg) {
            var alertBoxView = new AlertBoxView(alertBoxViewConfig);
            alertBoxView.model.set('error', msg);
            alertBoxView.start();
            alertBoxView.rivetView();
        }

        _.extend(Router, Backbone.Events);

        return Router;
    });