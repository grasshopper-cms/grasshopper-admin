/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker', 'resources'], function (BaseView, rivetView, app, loginWorker, resources) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header', rivetPrefix : 'header'}),
        showMyProfile : showMyProfile,
        logout : logout,
        setUser : setUser
    });

    function setUser () {
        if(this.app.user.get('loggedIn')) {
            this.model.set({
                admin : this.app.user.get('isAdmin'),
                user : this.app.user.get('id'),
                role : this.app.user.get('role')

            });
        } else {
            this.model.set({
                admin : (resources.user.roles.admin == this.app.user.get('role')),
                user : this.app.user.get('id'),
                role : this.app.user.get('role')

            });
        }

    }

    function logout () {
        loginWorker.doLogout(this);
    }

    function showMyProfile() {
        this.app.router.navigate('user/' + this.app.router.user.get('id'), {trigger: true});
    }

    return HeaderView;
});