/*global define:false*/
define(['baseView', 'rivetView']
    , function (BaseView, rivetView, templateHtml) {
        "use strict";

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'})
        });

        return LoginView;
    });