/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker', 'jquery'], function (BaseView, rivetView, loginWorker, $) {

    var HeaderView = BaseView.extend({
        setUser : setUser,
        afterRender : afterRender,
        remove : remove
    });

    function afterRender () {
        this.setUser();
    }

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

    function remove() {
        this.$el.empty();
        this.stopListening();
    }

    return HeaderView;
});