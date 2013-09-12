define(['baseView', 'rivetView', 'text!views/login/loginView.html']
    , function (BaseView, rivetView, templateHtml) {

        var LoginView = BaseView.extend({
            model : new Backbone.Model({name : 'Joe'}),
            el : "#stage",
            templateData : undefined,
            template : _.template(templateHtml),
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'})
        });

        return LoginView;
    });