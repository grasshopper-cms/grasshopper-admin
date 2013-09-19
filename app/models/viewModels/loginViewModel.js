define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        usernameValidate: usernameValidate,
        passwordValidate : passwordValidate
    });

    function validate(attributes, options) {
        var valid = this.usernameValidate(attributes);
        console.log("v" + valid);
        valid = this.passwordValidate(attributes) && valid;
        console.log("model is valid: " + valid);
        this.set('hasError', !valid, {validate: false});
        return !valid;
    }

    function usernameValidate(attributes) {
        var valid = true;
        if (attributes.username.length && attributes.username.length < 10) {
            console.log('>>> username error');
            valid = false;
            this.set('usernameError', 'Too Short.', {validate:false});
        } else {
            this.set('usernameError', '', {validate:false});
        }
        return valid;
    }

    function passwordValidate(attributes) {
        var valid = true;
        if (attributes.password.length && attributes.password.length < 10) {
            valid = false;
            this.set('passwordError', 'Too Short.', {validate:false});
        } else {
            this.set('passwordError', '', {validate:false});
        }
        return valid;
    }
});
