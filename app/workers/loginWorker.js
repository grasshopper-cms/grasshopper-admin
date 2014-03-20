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

        function doLogin () {
            var self = this;

            _getToken.call(this, this.model.get('username'), this.model.get('password'))
                .done(function(tokenObj) {
                    _setLocalStorageToken.call(self, tokenObj);
                    _authenticateToken.call(self)
                        .done(_handleSuccessfulAuthentication.bind(self))
                        .fail(_handleFailedAuthentication.bind(self));
                })
                .fail(function(xhr) {
                    self.throwLoginError(resources.api.login.errors[xhr.status]);
                });
        }

        function _getToken(username, password) {
            return Api.getToken(username, password);
        }

        function _setLocalStorageToken(tokenObj) {
            if ('Token' === tokenObj.token_type) {
                LocalStorage.set('authToken', tokenObj.access_token);
            }
        }

        function _authenticateToken() {
            return Api.authenticateToken(LocalStorage.get('authToken'));
        }

        function _handleSuccessfulAuthentication(userModel) {
            if(userModel.role !== 'external') {
                this.model.clear();
                this.app.user.set(userModel);
                this.app.router.navigateTrigger('items');
            } else {
                this.model.clear();
                this.app.router.navigateTrigger('logout');
            }
        }

        function _handleFailedAuthentication() {
            this.navigateTrigger('login');
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
                    $deferred.reject();
                    self.goLogout();
                });
        }

    });