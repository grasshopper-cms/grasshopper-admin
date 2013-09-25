define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig', 'app', 'underscore', 'baseView', 'UserModel'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, App, _, BaseView, UserModel) {

    var Router = Backbone.Router.extend({
        displayLogin : displayLogin,
        displayApp : displayApp,
        displayUserDetail : displayUserDetail,

        routes: {
            '': 'root',
            'login' : 'login',
            'user/:id' : 'userDetail'
        },

        root : function () {
            this.displayApp();
        },

        login : function () {
            this.displayLogin();
        },

        userDetail: function() {
            this.displayUserDetail();
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

        function displayUserDetail(id) {
            userWorker.displayProfile(id);
            console.log('the id you passed: ' + id);
        }

        _.extend(Router, Backbone.Events);

        var userModel = new UserModel();

        BaseView.prototype.app = {
            router : this,
            user : userModel
        };

        return Router;
    });
