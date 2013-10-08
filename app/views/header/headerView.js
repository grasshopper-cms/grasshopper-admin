/*global define:false*/
define(['baseView'], function (BaseView) {

    var HeaderView = BaseView.extend({
        setUser : setUser
    });

    function setUser () {
        // TODO: remove and replace with direct reference or clone if needed
        if (this.app.user.get('loggedIn')) {
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
                // TODO: ?
                name : 'Menu',
                url : 'home'
            });
        }
    }

    return HeaderView;
});