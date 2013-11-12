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
                console.log('this fired'); /////WHEN I LEFT FOR THE DAY THIS IS WHAT I WAS TROUBLE SHOOITING. THIS IS VALID CHECK
                loginWorker.doLogin(this);
            }
            return false;
        }

        function throwLoginError(xhr) {
            this.displayAlertBox(xhr);
        }

        return LoginView;
    });