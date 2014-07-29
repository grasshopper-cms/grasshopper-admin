/*global define:false*/
define(['grasshopperBaseView', 'login/options', 'loginWorker', 'api'],
    function (GrasshopperBaseView, loginOptions, loginWorker, Api) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : loginOptions,
        login : login,
        loginWithGoogle : loginWithGoogle,
        throwLoginError : throwLoginError
    });

    function login () {
        _toggleSpinner.call(this);

        if (this.model.isValid()) {
            loginWorker.doLogin.call(this)
                .always(_toggleSpinner.bind(this));
        }
        return false;
    }

    function loginWithGoogle() {
        _toggleSpinner.call(this);

        Api.getGoogleUrl()
            .done(function(url) {
                window.location.href = url;
            })
            .fail(this.throwLoginError.bind(this));
    }

    function _toggleSpinner() {
        this.model.toggle('loggingIn');
    }

    function throwLoginError (xhr) {
        this.fireErrorModal(xhr);
    }

});