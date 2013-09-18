/*global define:false*/
define(['baseView', 'rivetView']
    , function (BaseView, rivetView, templateHtml) {
        "use strict";

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'}),
            events : {
                'click #loginButton' : 'login'
            },
            login : login
        });

        function login() {
            console.log(this.model.attributes);
        }

        return LoginView;
    });