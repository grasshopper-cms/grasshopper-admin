/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker'], function (BaseView, rivetView, app, loginWorker) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header-partial', rivetPrefix : 'header'}),
        beforeRender:BeforeRender,
        updateHeaderModel : updateHeaderModel,
        logout : logout
    });

    function BeforeRender() {
        this.listenTo(app.user, 'change', updateHeaderModel);
    }

    function updateHeaderModel() {
        this.model.set('user', app.user.id);
    }

    function logout() {
        loginWorker.doLogout();
    }

    return HeaderView;
});