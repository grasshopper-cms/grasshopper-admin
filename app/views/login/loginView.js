define(['baseView', 'rivetView'], function (BaseView, rivetView) {

    var LoginView = BaseView.extend({
        model : new Backbone.Model({name: 'Joe'}),
        rivetScope : '#login',
        rivetPrefix : 'login',
        rivetView : rivetView
    });

    return LoginView;
});