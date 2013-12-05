/*global define:false*/
define(['GrasshopperBaseView', 'loginWorker'],function (GrasshopperBaseView, loginWorker) {

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

    function throwLoginError(xhr) {
        this.displayAlertBox(xhr);
    }

});