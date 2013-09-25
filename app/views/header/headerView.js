/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker', 'resources'], function (BaseView, rivetView, app, loginWorker, resources) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header', rivetPrefix : 'header'}),
        beforeRender:BeforeRender,
        logout : logout
    });

    function BeforeRender() {

        this.listenTo(app, 'change:userInfoRetrieved', function(){
            this.model.set({
                admin : (resources.user.roles.admin == app.user.get('role')),
                user : app.user.get('id'),
                role : app.user.get('role')

            });
        });

        this.listenTo(app,'change:loggedOut', function(){
            this.model.set({
                user : false,
                admin : false
            });
        });

    }

    function logout() {
        loginWorker.doLogout();
    }

    return HeaderView;
});