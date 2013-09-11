// Configure Rivets for each view.
rivets.configure({
    adapter: {
        subscribe: function(obj, keypath, callback) {
            callback.wrapped = function(m, v) { callback(v) };
            obj.on('change:' + keypath, callback.wrapped);
        },
        unsubscribe: function(obj, keypath, callback) {
            obj.off('change:' + keypath, callback.wrapped);
        },
        read: function(obj, keypath) {
            return obj.get(keypath);
        },
        publish: function(obj, keypath, value) {
            obj.set(keypath, value);
        }
    },
    // To prevent data attribute collision, you can set the prefix option to something like rv so that your data binding attributes are accessed as data-rv-text instead of just data-text.
    prefix: 'login'
    // preloadData: false // Set the preloadData option to false if you don’t want your bindings to be bootstrapped with the current model values on bind. This option is set to true by default.
});

define(['backbone'], function (Backbone) {
    console.log('before');
    var BaseView = Backbone.View.extend({

    });
    console.log('after');

    var user = new Backbone.Model({name: 'Joe'});
    var el = document.getElementById('navbar');

    rivets.bind(el, {user: user});

    return BaseView;

});
