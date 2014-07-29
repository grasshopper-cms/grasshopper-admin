/*global define:false*/
define(['grasshopperBaseView', 'login/options', 'loginWorker'],
    function (GrasshopperBaseView, loginOptions, loginWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : loginOptions,
        login : login,
        loginWithGoogle : loginWithGoogle,
        throwLoginError : throwLoginError
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin.call(this);
        }
        return false;
    }

    function loginWithGoogle() {
        console.log('YEAH BUDDy');
    }

    function throwLoginError (xhr) {
        this.fireErrorModal(xhr);
    }

});