/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker']
    , function (BaseView, rivetView, loginWorker,templateHtml) {
        "use strict";

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'}),
            login : login
        });

        function login() {
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("------------------");
            console.log("> " + this.model.isValid());
            if (this.model.isValid()) {
                loginWorker.something();
            } else {
            }

        }

        return LoginView;
    });