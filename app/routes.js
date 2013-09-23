define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig'], function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig) {

    var Router = Backbone.Router.extend({
        isLoggedIn : isLoggedIn,
        displayLogin : displayLogin,
        displayApp : displayApp,

        routes: {
            "": "root",
            "login" : "login"
        },

        root: function() {
            this.isLoggedIn() ? this.displayApp() : this.navigate("login", {trigger: true});
        },

        login: function() {
            this.displayLogin();
        }

    });

    function isLoggedIn() {
        return Api.authenticateToken(localStorage.authToken) ? true : false;
    }

    function displayLogin() {
        var loginView = new LoginView(loginViewConfig);
        loginView.start();
        loginView.rivetView();
    }

    function displayApp() {
        // Get the current Logged In users Details.
        userWorker.getCurrentUserDetails();
        // Display the app.
        var emptyView = new EmptyView(emptyViewConfig);
        emptyView.start();
        emptyView.rivetView();
    }

    return Router;
});