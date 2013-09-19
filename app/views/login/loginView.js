/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker', 'userModel']
    , function (BaseView, rivetView, loginWorker, userModel,templateHtml) {
        "use strict";

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'}),
            login : login
        });

        function login() {
            if (this.model.isValid()) {
                loginWorker.doLogin(this.model, userModel);
            }
        }

        return LoginView;
    });