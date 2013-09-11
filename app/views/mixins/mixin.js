define(['underscore'], function(_) {

    function mixin(defaultOptions, mixinFunction) {

        return function(options) {
           var config = {};

            _.extend(config, defaultOptions, options);

            return function() {
                mixinFunction.call(this, config, arguments);
            }
        }
    }

    return mixin;
});