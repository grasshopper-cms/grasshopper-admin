define(['masseuse'], function (masseuse) {
    'use strict';
    /**
     * To use this model, extend it and it will auto run the validate function - if present - on set.
     */
    var Model = masseuse.MasseuseModel;
    return Model.extend({
        set : set
    });

    function set (key, val, opts) {
        opts = opts || {};
        opts.validate = (opts.validate === undefined) ? true : opts.validate;
        Model.prototype.set.apply(this, [key, val, opts]);
    }
});
