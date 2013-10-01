define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'UserModel'],
    function (api, $, EmptyView, emptyViewConfig, resources,  UserModel) {
        'use strict';

        /**
         * @class loginWorker
         */
        return {
            doLogin : doLogin
        };

        function doLogin (loginView) {
            api.getToken(loginView.model.get('username'), loginView.model.get('password'))
                .done(function (data) {
                    if ('Token' === data.token_type) {
                        localStorage.authToken = data.access_token;
                        loginView.model.clear();
                        loginView.app.router.navigate('home', {trigger: true});
                    }
                })
                .fail(function (xhr) {
                    loginView.throwLoginError(resources.api.login.errors[xhr.status]);
                });
        }
    });