define(['selfValidatingModel', 'validation', 'ComputedProperty'], function (Model, validation, ComputedProperty) {
    return Model.extend({

        validate: validate,
        setErrors : setErrors,
        attributeValidate : attributeValidate,
        hasError: ComputedProperty(["usernameError", "passwordError"], function (usernameError, passwordError) {
            return !!(usernameError || passwordError);
        })
    });

    function validate(attributes, options) {
        var valid = this.attributeValidate(attributes.username, 'usernameError');
        valid = this.attributeValidate(attributes.password, 'passwordError') && valid;
        return !valid;
    }

    function attributeValidate(attribute, errorAttribute) {
        var valid = true;
        if (validation.stringHasLength(attribute)) {
            this.setErrors.call(this, errorAttribute, '', false);
        } else {
            valid = false;
            this.setErrors.call(this, errorAttribute, 'Too Short.', false);
        }
        return valid;
    }

    function setErrors(attribute, message, validateFlag) {
        this.set(attribute, message, {validate : validateFlag});
    }
});
