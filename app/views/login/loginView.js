/*global define:false*/
define(['grasshopperBaseView', 'loginViewConfig', 'loginWorker'],
    function (GrasshopperBaseView, loginViewConfig, loginWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : loginViewConfig,
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