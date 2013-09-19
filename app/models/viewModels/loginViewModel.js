define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        hasLength : hasLength,
        setErrors : setErrors,
        attributeValidate : attributeValidate
    });

    function validate(attributes, options) {
        var valid = this.attributeValidate(attributes.username, 'usernameError');
        valid = this.attributeValidate(attributes.password, 'passwordError') && valid;
        this.set('hasError', !valid, {validate: false});
        return !valid;
    }

    function attributeValidate(attribute, errorAttribute) {
        var valid = true;
        if (!this.hasLength(attribute)) {
            valid = false;
            this.setErrors.call(this, errorAttribute, 'Too Short.', false);
        } else {
            this.setErrors.call(this, errorAttribute, '', false);
        }
        return valid;
    }

    function hasLength(str) {
        return str.length ? true : false;
    }

    function setErrors(attribute, message, validateFlag) {
        this.set(attribute, message, {validate : validateFlag})
    }
});
