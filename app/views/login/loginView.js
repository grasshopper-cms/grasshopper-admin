/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker']
    , function (BaseView, rivetView, loginWorker,templateHtml) {
        "use strict";

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'}),
            events : {
                'click #loginButton' : 'login'
            },
            login : login
        });

        function login() {
            console.log(this);
            console.log('hi');
            console.log(loginWorker);
        }

        return LoginView;
    });