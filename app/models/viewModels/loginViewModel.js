define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        hasLength : hasLength,
        setErrors : setErrors,
        attributeValidate : attributeValidate
    });

    function validate(attributes, options) {
        var valid = this.attributeValidate(attributes.username, 'usernameError');
        console.log("v" + valid);
        valid = this.attributeValidate(attributes.password, 'passwordError') && valid;
        console.log("model is valid: " + valid);
        this.set('hasError', !valid, {validate: false});
        return !valid;
    }

    function attributeValidate(attribute, errorAttribute) {
        var valid = true;
        if (!this.hasLength(attribute)) {
            console.log('>>> ' + attribute +' error');
            valid = false;
            this.setErrors.call(this, errorAttribute, 'Too Short.', false);
        } else {
            this.setErrors.call(this, errorAttribute, '', false);
        }
        return valid;
    }

    function hasLength(str) {
        if (str.length) {
            return true;
        } else {
            return false;
        }
    }

    function setErrors(attribute, message, validateFlag) {
        this.set(attribute, message, {validate : validateFlag})
    }
});
