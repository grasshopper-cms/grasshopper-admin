define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig', 'app', 'underscore', 'baseView', 'UserModel'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, App, _, BaseView, UserModel) {


        var Router = Backbone.Router.extend({
            displayLogin : displayLogin,
            displayApp : displayApp,

            routes : {
                "" : "root",
                "login" : "login"
            },

            root : function () {
                this.displayApp();
            },

            login : function () {
                this.displayLogin();
            }

        });

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

        _.extend(Router, Backbone.Events);

        var userModel = new UserModel();

        BaseView.prototype.app = {
            router : this,
            user : userModel
        };

        return Router;
    });