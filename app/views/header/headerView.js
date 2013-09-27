/*global define:false*/
define(['baseView', 'rivetView', 'app', 'loginWorker', 'userWorker'], function (BaseView, rivetView, app, loginWorker, userWorker) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header', rivetPrefix : 'header'}),
        showMyProfile : showMyProfile,
        logout : logout,
        setUser : setUser,
        displayUsers : displayUsers
    });

    function setUser () {
        if(this.app.user.get('loggedIn')) {
            this.model.set({
                admin : this.app.user.get('isAdmin'),
                loggedIn : this.app.user.get('loggedIn'),
                role : this.app.user.get('role'),
                name : this.app.user.get('name')

            });
        } else {
            this.model.set({
                admin : false,
                loggedIn : false,
                role : false,
                name : 'Menu'
            });
        }
    }

    function logout () {
        loginWorker.doLogout(this);
        return false;
    }

    function showMyProfile() {
        this.app.router.navigate('user/' + this.app.router.user.get('id'), {trigger: true});
        return false;
    }

    function displayUsers() {
        this.app.router.navigate('users', {trigger: true});
        return false;
    }

    return HeaderView;
});