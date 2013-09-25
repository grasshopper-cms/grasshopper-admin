define(['masseuseModel'], function (Model) {
    /**
     * To use this model, extend it and it will auto run the validate function - if present - on set.
     */
    return Model.extend({
        set : set
    });

    function set (key, val, opts) {
        opts = opts || {};
        opts.validate = (opts.validate === undefined) ? true : opts.validate;
        Model.prototype.set.apply(this, [key, val, opts]);
    }
});
