define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig', 'underscore', 'baseView'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, _, BaseView) {

        var Router = Backbone.Router.extend({
            displayLogin : displayLogin,
            displayApp : displayApp,
            displayUserDetail : displayUserDetail,

            routes : {
                "" : "root",
                "login" : "login",
                "user/:id" : "userDetail"
            },

            root : function () {
                this.displayApp();
            },

            login : function () {
                this.displayLogin();
            },

            userDetail : function() {
                this.displayUserDetail();
            }
        });

        function displayLogin () {
            var loginView = new LoginView(loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(BaseView.prototype.app.user);
            // Display the app.
            var emptyView = new EmptyView(emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();
        }

        function displayUserDetail(id) {
            userWorker.displayProfile(id);
            console.log('the id you passed: ' + id);
        }

        _.extend(Router, Backbone.Events);

        return Router;
    });