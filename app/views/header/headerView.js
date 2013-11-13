/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker', 'jquery', 'proxyProperty', 'computedProperty'], function (BaseView, rivetView, loginWorker, $, ProxyProperty, ComputedProperty) {

    var HeaderView = BaseView.extend({
        initialize : initialize
    });

    function initialize () {
        var user;
        BaseView.prototype.initialize.apply(this, arguments);
        user = this.app.user;
        // TODO: This should be in the HeaderView Model. Does not belong in here.
        this.model.set({
            admin :    ProxyProperty('isAdmin', user),
            loggedIn : ProxyProperty('loggedIn', user),
            role :     ProxyProperty('role', user),
            firstName : ProxyProperty('firstName', user),
            lastName : ProxyProperty('lastName', user),
            fullName : ComputedProperty(['firstName', 'lastName'], function(firstName, lastName) {
               return firstName + ' ' + lastName;
            }),
            userUrl :  ProxyProperty('urlLink', user),
            url :      ComputedProperty(['userUrl', 'loggedIn'], function(userUrl, loggedIn) {
                  return loggedIn ? userUrl : 'home';
            })
        });
    }

    return HeaderView;
});
