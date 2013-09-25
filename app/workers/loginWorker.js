define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig', 'UserModel'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig,  UserModel) {
        'use strict';

        return {
            doLogin : doLogin,
            doLogout : doLogout
        };

        function doLogin (loginModel, thisUser, router) {
            api.getToken(loginModel.get('username'), loginModel.get('password'))
                .done(function (data) {
                    if ("Token" === data.token_type) {
                        localStorage.authToken = data.access_token;
                        thisUser.trigger('change:loggedIn');
                        router.displayApp();
                    }
                })
                .fail(function (xhr) {
                    throwLoginError(xhr);
                });
        }

        function throwLoginError (xhr) {
            var alertBoxView = new AlertBoxView(alertBoxViewConfig);
            alertBoxView.model.set('loginError', resources.api.login.errors[xhr.status]);
            alertBoxView.start();
            alertBoxView.rivetView();
        }

        function doLogout (thisUser, router) {
            localStorage.authToken = '';
            router.displayLogin();
            thisUser.trigger('change:loggedOut');
            thisUser = new UserModel();

        }
    });