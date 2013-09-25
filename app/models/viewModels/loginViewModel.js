define(['masseuseModel', 'validation'], function (Model, validation) {
    return Model.extend({
        validate : validate
    });

    function validate (attributes, options) {
        var self = this,
            invalid;

        _.forEach([
            'username',
            'password'
        ], function (attribute) {
            var value = attributes[attribute];

            // Part of validation the model is to make sure all computed values are set
            self.set(attribute, value);

            // Validate the individual attribute
            if (!validation.stringHasLength(value)) {
                invalid = true;
            }
        });
        return invalid;
    }
});
