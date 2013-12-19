/*global define:false*/
define(['grasshopperBaseView', 'loginWorker'], function (GrasshopperBaseView, loginWorker) {
    'use strict';
    return GrasshopperBaseView.extend({
        login : login,
        throwLoginError : throwLoginError
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin(this);
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