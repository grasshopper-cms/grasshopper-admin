define(['baseView', 'rivetView'], function (BaseView, rivetView) {

    var LoginView = BaseView.extend({
        model : new Backbone.Model({name: 'Joe'}),
        rivetView : rivetView({rivetScope: '#login', rivetPrefix: 'login'})
    });

    return LoginView;
});