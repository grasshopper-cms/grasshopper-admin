/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker'], function (BaseView, rivetView, loginWorker) {

    var LoginView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login', instaUpdateRivets : true}),
        login : login,
        throwLoginError : throwLoginError
    });

    function login () {
        if (this.model.isValid()) {
            loginWorker.doLogin(this, this.app.user);
        }
    }

    function throwLoginError(xhr) {
        this.app.router.displayAlertBox(xhr);
    }

    return LoginView;
});