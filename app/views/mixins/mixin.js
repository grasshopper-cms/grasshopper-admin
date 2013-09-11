define(['underscore'], function(_) {

    function mixin(defaultOptions, mixinFunction) {

        return function(options) {
           var config = {};

            _.extend(config, defaultOptions, options);

            return function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(config);
                mixinFunction.apply(this, args);
            }
        }
    }

    return mixin;
});
