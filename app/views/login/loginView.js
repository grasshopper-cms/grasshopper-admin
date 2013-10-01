/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker'],
    /**
     * @param BaseView
     * @param rivetView
     * @param {loginWorker} loginWorker
     */
        function (BaseView, rivetView, loginWorker) {

        /**
         * @class LoginView extends @BaseView
         */
        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login-page', rivetPrefix : 'login', instaUpdateRivets : true}),
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