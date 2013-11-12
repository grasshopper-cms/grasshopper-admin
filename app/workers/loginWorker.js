define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'LocalStorage'],
    function (api, $, EmptyView, emptyViewConfig, resources, LocalStorage) {
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
                        LocalStorage.set('authToken', data.access_token);
                    }
                    api.authenticateToken(LocalStorage.get('authToken'))
                        .done(function (data) {
                            loginView.model.clear();
                            loginView.app.user.set({
                                _id : data._id,
                                email : data.email,
                                enabled : data.enabled,
                                login : data.login,
                                firstName : data.firstname,
                                lastName : data.lastname,
                                role : data.role
                            });
                            loginView.app.router.navigateTrigger('home');
                        })
                        .fail(function () {
                            self.navigateTrigger('login');
                        });
                })
                .fail(function (xhr) {
                    loginView.throwLoginError(resources.api.login.errors[xhr.status]);
                });
        }
    });