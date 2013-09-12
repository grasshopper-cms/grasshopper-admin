define(['baseView', 'rivetView', 'text!views/login/loginView.html']
    , function (BaseView, rivetView, templateHtml) {
    "use strict";

        var LoginView = BaseView.extend({
            model : new Backbone.Model({name : 'Joe'}),
            el : "#stage",
            templateHtml : templateHtml,
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'})
        });

        return LoginView;
    });