define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'LocalStorage'],
    function (Api, $, EmptyView, emptyViewConfig, resources, LocalStorage) {
        'use strict';

        /**
         * @class loginWorker
         */
        return {
            doLogin : doLogin,
            userIsStillValidUser : userIsStillValidUser
        };

        function doLogin (loginView) {
            Api.getToken(loginView.model.get('username'), loginView.model.get('password'))
                .done(function (data) {
                    if ('Token' === data.token_type) {
                        LocalStorage.set('authToken', data.access_token);
                    }
                    Api.authenticateToken(LocalStorage.get('authToken'))
                        .done(function (data) {
                            loginView.model.clear();
                            loginView.app.user.set(data);
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

        function userIsStillValidUser($deferred) {
            var self = this,
                token = LocalStorage.get('authToken');
            if (token) {
                if (!this.user.get('_id')) {
                    Api.authenticateToken(token)
                        .done(function (data) {
                            self.user.set(data);
                            if (!self.headerView) {
                                self.startHeader();
                            }
                            $deferred.resolve();
                        })
                        .fail(function () {
                            self.goLogout();
                            $deferred.reject();
                        });
                } else {
                    verifyAuthToken.call(self, $deferred);
                    if (!self.headerView) {
                        self.startHeader();
                    }
                    $deferred.resolve();
                }
            } else {
                self.removeHeader();
                $deferred.reject();
            }
        }

        function verifyAuthToken($deferred) {
            var self = this;
            Api.authenticateToken(LocalStorage.get('authToken'))
                .error(function() {
                    console.log('verifyAuthTokenFired');
                    $deferred.reject();
                    self.goLogout();
                });
        }

    });