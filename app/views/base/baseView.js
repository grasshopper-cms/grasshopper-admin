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
    prefix: 'login'
    // preloadData: false
});

define(['backbone'], function (Backbone) {

    var BaseView = Backbone.View.extend({

    });

    // This should not be in this file. Put it here for demonstration.
    var user = new Backbone.Model({name: 'Joe'});
    var el = document.getElementById('navbar');
    // bind data to rivets values.
    rivets.bind(el, {user: user});

    return BaseView;

});
