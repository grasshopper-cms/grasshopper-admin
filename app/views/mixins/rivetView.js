define(['rivets'], function (Rivets) {

    function rivetView() {

        Rivets.configure({
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
            prefix: this.rivetPrefix
            // preloadData: false
        });

        // bind data to rivets values.
        Rivets.bind($(this.rivetScope), {data: this.model});
    }

    return rivetView;
});