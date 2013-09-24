/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker'], function (BaseView, rivetView, app, loginWorker) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header-partial', rivetPrefix : 'header'}),
        beforeRender:BeforeRender,
        logout : logout
    });

    function BeforeRender() {
        this.listenTo(app, 'change:userInfoRetrieved', function(){
            this.model.set('user', app.user.id);
        });
        this.listenTo(app,'change:loggedOut', function(){
            this.model.set('user', false);
        });
    }

    function logout() {
        loginWorker.doLogout();
    }

    return HeaderView;
});