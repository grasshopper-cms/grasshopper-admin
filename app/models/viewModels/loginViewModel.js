define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        usernameValidate: usernameValidate,
        passwordValidate : passwordValidate
    });

    function validate(attributes, options) {
        valid = true;
        valid = this.usernameValidate(attributes);
        console.log("v" + valid);
        valid = this.passwordValidate(attributes) && valid;
        console.log("model is valid: " + valid);
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

// alternative approach :
//    return Model.extend({
//        validate: validate,
//        userNameValidate: userNameValidate,
//        passwordValidate : passwordValidate,
//        setErrors : setErrors
//    });
//
//    function validate(attributes, options) {
//        // check if the userName has changed
//        if(this.changedAttributes(attributes).userName) {
//            return this.userNameValidate.call(this, attributes);
//        }
//
//        // check if the password has changed
//        if(this.changedAttributes(attributes).password) {
//            return this.passwordValidate.call(this, attributes);
//        }
//    }
//
//    function userNameValidate(attributes) {
//        if (attributes.userName.length < 10) {
//            // Set Classes and errors
//            this.setErrors.call(this, 'userNameError', 'User Name Is Too Short!', '#loginUsername');
//            return 'error';
//        } else {
//            this.setErrors.call(this, 'userNameError', '', '#loginUsername');
//        }
//    }
//
//    function passwordValidate(attributes) {
//        if (attributes.password.length < 10) {
//            // Set Classes and errors
//            this.setErrors.call(this, 'passwordError', 'Password Is Too Short', '#loginPassword');
//            return 'error';
//        } else {
//            this.setErrors.call(this, 'passwordError', '', '#loginPassword');
//        }
//    }
//
//    function setErrors(attributeName, message, errorElement) {
//        this.set(attributeName, message, {validate: false});
//        $(errorElement).toggleClass('error');
//    }
});
