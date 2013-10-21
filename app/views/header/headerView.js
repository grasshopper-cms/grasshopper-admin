/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker', 'jquery', 'proxyProperty', 'computedProperty'], function (BaseView, rivetView, loginWorker, $, ProxyProperty, ComputedProperty) {

    var HeaderView = BaseView.extend({
        initialize : initialize,
        remove : remove
    });

    function initialize () {
        var user;
        BaseView.prototype.initialize.apply(this, arguments);
        user = this.app.user;
        this.model.set({
            admin :    ProxyProperty('isAdmin', user),
            loggedIn : ProxyProperty('loggedIn', user),
            role :     ProxyProperty('role', user),
            userName : ProxyProperty('name', user),
            userUrl :  ProxyProperty('urlLink', user),
            url :      ComputedProperty(['userUrl', 'loggedIn'], function(userUrl, loggedIn) {
                  return loggedIn ? userUrl : 'home';
            }),
            name : ComputedProperty(['userName'], function(userName) {
                return userName || 'Menu';
            })
        });
    }

    function remove() {
        this.$el.empty();
        this.stopListening();
    }

    return HeaderView;
});
