/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker'], function (BaseView, rivetView, loginWorker) {

    var HeaderView = BaseView.extend({
        rivetView : rivetView({rivetScope : '#header', rivetPrefix : 'header'}),
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
                name : this.app.user.get('name'),
                url : this.app.user.get('urlLink')
            });
        } else {
            this.model.set({
                admin : false,
                loggedIn : false,
                role : false,
                name : 'Menu',
                url : 'home'
            });
        }
    }

    function logout () {
        loginWorker.doLogout(this);
        return false;
    }

    function displayUsers() {
        this.app.router.navigate('users', {trigger: true});
        return false;
    }

    return HeaderView;
});