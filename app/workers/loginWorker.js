define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'UserModel'],
    function (api, $, EmptyView, emptyViewConfig, resources,  UserModel) {
        'use strict';

        return {
            doLogin : doLogin,
            doLogout : doLogout
        };

        function doLogin (loginView) {
            api.getToken(loginView.model.get('username'), loginView.model.get('password'))
                .done(function (data) {
                    if ("Token" === data.token_type) {
                        localStorage.authToken = data.access_token;
                        loginView.app.user.trigger('change:loggedIn');
                        loginView.app.router.displayApp();
                    }
                })
                .fail(function (xhr) {
                    loginView.throwLoginError(xhr);
                });
        }

        function doLogout (thisUser) {
            localStorage.authToken = '';
            thisUser.app.router.displayLogin();
            thisUser.app.user.trigger('change:loggedOut');
            thisUser.app.user = new UserModel();

        }
    });