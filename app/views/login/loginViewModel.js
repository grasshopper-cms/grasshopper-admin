define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        set: set,
        validate: validate
    });

    function set(key, val, opts) {
        opts = opts || {};
        opts.validate = (opts.validate === undefined) ? true : opts.validate;
        Backbone.Model.prototype.set.apply(this, [key, val, opts])
    }

    function validate() {
        console.log('VALIDATION NATION!!');
        console.log(this.attributes);
    }
});
