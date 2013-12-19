define(['api', 'jquery', 'resources', 'masseuse', 'helpers'],
    function (Api, $, resources, masseuse, helpers) {
        'use strict';

        var LocalStorage = helpers.localStorage;
        /**
         * @class loginWorker
         */
        return {
            doLogin : doLogin,
            userIsStillValidUser : userIsStillValidUser
        };

        function doLogin (loginView) {
            var self = this;
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

        function userIsStillValidUser ($deferred) {
            var self = this,
                token = LocalStorage.get('authToken');
            if (token) {
                _checkAuthenticationOnApi.call(this, token, self, $deferred);
            } else {
                self.removeHeader();
                $deferred.reject();
            }
        }

        function _checkAuthenticationOnApi (token, self, $deferred) {
            if (!this.user.get('_id')) {
                this.$deferred = $deferred;
                Api.authenticateToken(token)
                    .done(_tokenIsValid.bind(self))
                    .fail(_tokenIsNotValid.bind(self));
            } else {
                verifyAuthToken.call(self, $deferred);
                if (!self.headerView) {
                    self.startHeader();
                }
                $deferred.resolve();
            }
        }

        function _tokenIsValid (data) {
            this.user.set(data);
            if (!this.headerView) {
                this.startHeader();
            }
            this.$deferred.resolve();
        }

        function _tokenIsNotValid () {
            this.goLogout();
            this.$deferred.reject();
        }

        function verifyAuthToken ($deferred) {
            var self = this;
            Api.authenticateToken(LocalStorage.get('authToken'))
                .error(function () {
                    console.log('verifyAuthTokenFired');
                    $deferred.reject();
                    self.goLogout();
                });
        }

    });