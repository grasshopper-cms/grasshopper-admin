/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker'], function (BaseView, rivetView, loginWorker) {

    var LoginView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login', instaUpdateRivets : true}),
        login : login,
        throwLoginError : throwLoginError
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin(this);
        }
    }

    function throwLoginError(xhr) {
        this.displayAlertBox(xhr);
    }

    return LoginView;
});