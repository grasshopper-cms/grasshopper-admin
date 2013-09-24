define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig) {

    var Router = Backbone.Router.extend({
        displayLogin : displayLogin,
        displayApp : displayApp,

        routes: {
            "": "root",
            "login" : "login",
            "*default" : "displayApp"
        },

        // TODO: why is isLoggedIn here instead of in initialize
        // The page load always starts on main.js, so you can do the
        // logged in checks on initialize.
        root: function() {
            this.displayApp();
        },

        login: function() {
            this.displayLogin();
        }

    });

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


//
//listenToobject.listenTo(other, event, callback)
//Tell an object to listen to a particular event on an other object.
//    The advantage of using this form, instead of other.on(event, callback, object),
//    is that listenTo allows the object to keep track of the events,
//    and they can be removed all at once later on.
//    The callback will always be called with object as context.
//
//    view.listenTo(model, 'change', view.render);