/*global define:false*/
define(['grasshopperBaseView', 'loginViewConfig', 'loginWorker', 'jquery'],
    function (GrasshopperBaseView, loginViewConfig, loginWorker, $) {
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

    function fireAlertBox(e) {
        var style = $(e.target).text();

        if(style === 'error') {
            this.fireErrorModal('Error MEssage YEAH');
        } else {
            this.displayAlertBox(
                {
                    msg : style,
                    header : style,
                    style : style
                }
            );
        }

    }

});