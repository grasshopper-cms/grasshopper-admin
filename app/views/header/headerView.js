/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker'], function (BaseView, rivetView, app, loginWorker) {

    var NavbarView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#navbar-partial', rivetPrefix : 'navbar'}),
        beforeRender:BeforeRender,
        updateNavbarModel : updateNavbarModel,
        logout : logout
    });

    function BeforeRender() {
        this.listenTo(app.user, 'change', updateNavbarModel);
    }

    function updateNavbarModel() {
        this.model.set('user', app.user.id);
    }

    function logout() {
        loginWorker.doLogout();
    }

    return NavbarView;
});