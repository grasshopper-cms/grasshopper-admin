define(['backbone', 'loginView', 'loginViewConfig', 'api', 'loginWorker', 'userWorker', 'emptyView', 'emptyViewConfig', 'underscore', 'baseView', 'UserModel', 'alertBoxView', 'alertBoxViewConfig', 'resources', 'userDetailView', 'userDetailViewConfig'],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, _, BaseView, UserModel, AlertBoxView, alertBoxViewConfig, resources, UserDetailView, userDetailViewConfig) {

        var userModel = new UserModel();

        var Router = Backbone.Router.extend({
            displayLogin : displayLogin,
            displayApp : displayApp,
            displayUserDetail : displayUserDetail,
            displayAlertBox : displayAlertBox,

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

            userDetail : function(id) {
                this.displayUserDetail(id);
            },
            user : userModel
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