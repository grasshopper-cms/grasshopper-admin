define(['backbone'], function (Backbone) {
    /**
     * To use this model, extend it and it will auto run the validate function - if present - on set.
     */
    return Backbone.Model.extend({
        set: set
    });

    function set(key, val, opts) {
        opts = opts || {};
        opts.validate = (opts.validate === undefined) ? true : opts.validate;
        Backbone.Model.prototype.set.apply(this, [key, val, opts]);
    }
});
