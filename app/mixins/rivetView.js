define(['rivets', 'mixin'], function (Rivets, mixin) {

    return mixin({
            rivetScope : undefined,
            rivetPrefix : undefined
        }

        , function (config) {
            Rivets.configure({
                adapter : {
                    subscribe : function (obj, keypath, callback) {
                        callback.wrapped = function (m, v) {
                            callback(v)
                        };
                        obj.on('change:' + keypath, callback.wrapped);
                    },
                    unsubscribe : function (obj, keypath, callback) {
                        obj.off('change:' + keypath, callback.wrapped);
                    },
                    read : function (obj, keypath) {
                        console.log(keypath);
                        return obj.get(keypath);
                    },
                    publish : function (obj, keypath, value) {
                        // Not setting the model breaks Rivets
                        obj.set(keypath, value, {validate: false});
                        // We have to validate the model to get errors to show correctly
                        obj.validate(obj.attributes);
                    }
                },
                prefix : config.rivetPrefix
                // preloadData: false
            });

            // bind data to rivets values.
            Rivets.bind($(config.rivetScope), {data : this.model});
        });
});