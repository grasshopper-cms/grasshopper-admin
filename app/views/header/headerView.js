/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker', 'resources'], function (BaseView, rivetView, app, loginWorker, resources) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header', rivetPrefix : 'header'}),
        showMyProfile : showMyProfile,
        beforeRender : BeforeRender,
        logout : logout
    });

    function BeforeRender () {

        this.listenTo(this.app.user, 'change:userInfoRetrieved', function () {
            this.model.set({
                admin : (resources.user.roles.admin == this.app.user.get('role')),
                user : this.app.user.get('id'),
                role : this.app.user.get('role')

            });
        });

        this.listenTo(this.app.user, 'change:loggedOut', function () {
            this.model.set({
                user : false,
                admin : false
            });
        });

    }

    function logout () {
        loginWorker.doLogout(this.app.user, this.app.router);
    }

    function showMyProfile() {
        this.app.router.navigate('user/' + this.app.router.user.get('id'), {trigger: true});
    }

    return HeaderView;
});