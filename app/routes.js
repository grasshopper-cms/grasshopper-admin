define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig', 'app', 'underscore', 'baseView', 'UserModel'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, App, _, BaseView, UserModel) {

<<<<<<< HEAD
    var Router = Backbone.Router.extend({
        displayLogin : displayLogin,
        displayApp : displayApp,
        displayUserDetail : displayUserDetail,

        routes: {
            '': 'root',
            'login' : 'login',
            'user/:id' : 'userDetail'
        },
=======

        var Router = Backbone.Router.extend({
            displayLogin : displayLogin,
            displayApp : displayApp,
>>>>>>> origin/bismuth

            routes : {
                "" : "root",
                "login" : "login"
            },

<<<<<<< HEAD
        login: function() {
            this.displayLogin();
        },

        userDetail: function() {
            this.displayUserDetail();
=======
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
>>>>>>> origin/bismuth
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

<<<<<<< HEAD
     function displayUserDetail(id) {
         userWorker.displayProfile(id);

         console.log('the id you passed: ' + id);
     }

    _.extend(Router, Backbone.Events);
=======
        BaseView.prototype.app = {
            router : this,
            user : userModel
        };
>>>>>>> origin/bismuth

        return Router;
    });
