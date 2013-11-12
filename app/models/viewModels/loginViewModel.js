define(['masseuseModel', 'validation', 'computedProperty'], function (Model, validation, ComputedProperty) {
    return Model.extend({
        validate : validate,
        defaults: {
            username : '',
            password : '',
            usernameError : new ComputedProperty(['username'], validateUserLoginAttribute, true),
            passwordError : new ComputedProperty(['password'], validateUserLoginAttribute, true),
            // hasError is used to great out the submit box
            hasError : new ComputedProperty(['usernameError', 'passwordError'], checkForErrors)
        }
    });

    function validate (attributes, options) {
        console.log(attributes);
        console.log(options);
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

    function validateUserLoginAttribute (attribute) {
        return validation.stringHasLength(attribute) ? undefined : 'Too Short.';
    }

    function checkForErrors (usernameError, passwordError) {
        return !!(usernameError || passwordError);
    }
});
