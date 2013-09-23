define(['backbone', 'loginView', 'loginViewConfig'], function (Backbone, LoginView, loginViewConfig) {

    var Router = Backbone.Router.extend({
        routes: {
            "": "login"
        },

        login:  function() {
            var loginView = new LoginView(loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

    });

    return Router;
});