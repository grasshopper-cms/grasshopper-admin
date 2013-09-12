define(['baseView', 'rivetView', 'text!views/login/loginView.html']
    , function (BaseView, rivetView, templateHtml) {

    var LoginView = BaseView.extend({
        model : new Backbone.Model({name: 'Joe'}),
        template : _.template(templateHtml),
        rivetView : rivetView({rivetScope: '#login', rivetPrefix: 'login'})
    });

    // console.log(typeof LoginView);
    // console.log(LoginView.hasOwnProperty('model'));
    // console.log(Object.keys(LoginView));
    // LoginView.renderToStage();
    // var duder = function() {
    //     $('#stage').html(LoginView.template);
    // }();


    return LoginView;
});