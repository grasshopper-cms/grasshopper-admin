/*global define:false*/
define(['grasshopperBaseView', 'loginViewConfig', 'loginWorker'],
    function (GrasshopperBaseView, loginViewConfig, loginWorker) {
    'use strict';
    return GrasshopperBaseView.extend({
        defaultOptions : loginViewConfig,
        login : login,
        throwLoginError : throwLoginError
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin.call(this);
        }
        return false;
    }

    function throwLoginError (xhr) {
        this.displayAlertBox(
            {
                msg : xhr
            }
        );
    }

});