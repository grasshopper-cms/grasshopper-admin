/*global define:false*/
define(['baseView', 'loginWorker'],
    /**
     * @param BaseView
     * @param rivetView
     * @param {loginWorker} loginWorker
     */
        function (BaseView, loginWorker) {

        /**
         * @class LoginView extends @BaseView
         */
        var LoginView = BaseView.extend({
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

        return LoginView;
    });