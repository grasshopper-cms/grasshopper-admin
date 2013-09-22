define(['rivets', 'mixin'], function (Rivets, mixin) {

    return mixin({
            rivetScope : undefined,
            rivetPrefix : undefined,
            instaUpdateRivets : false
        }, function (config) {
            Rivets.configure({
                adapter : {
                    subscribe : function (obj, keypath, callback) {
                        callback.wrapped = function (m, v) {
                            callback(v);
                        };
                        obj.on('change:' + keypath, callback.wrapped);
                    },
                    unsubscribe : function (obj, keypath, callback) {
                        obj.off('change:' + keypath, callback.wrapped);
                    },
                    read : function (obj, keypath) {
                        return obj.get(keypath);
                    },
                    publish : function (obj, keypath, value) {
                        obj.set(keypath, value);
                    }
                },
                prefix : config.rivetPrefix
                // preloadData: false
            });

            // bind data to rivets values.
            Rivets.bind($(config.rivetScope), {data : this.model});

            // Rivets works off of listening to the change event, which doesn't happen on inputs until loss of focus
            // Work around that if desired
            if (config.instaUpdateRivets) {
                this.elementCache(config.rivetScope + ' input').on('keypress paste textInput input', function () {
                    $(this).trigger('change');
                });
            }
        });
});