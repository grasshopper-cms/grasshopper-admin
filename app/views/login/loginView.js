/*global define:false*/
define(['grasshopperBaseView', 'loginViewConfig', 'loginWorker'],
    function (GrasshopperBaseView, loginViewConfig, loginWorker) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : loginViewConfig,
        login : login,
        throwLoginError : throwLoginError,
        fireAlertBox : fireAlertBox
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin.call(this);
        }
        return false;
    }

    function throwLoginError (xhr) {
        this.fireErrorModal(xhr);
    }

});