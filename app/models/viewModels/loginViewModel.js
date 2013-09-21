define(['masseuseModel', 'validation'], function (Model, validation) {
    return Model.extend({

        validate: validate,
        setErrors : setErrors,
        attributeValidate : attributeValidate
    });

    function validate(attributes, options) {
        // We can't just check 'hasError', since it is not set initially, so we have to look through the model
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
