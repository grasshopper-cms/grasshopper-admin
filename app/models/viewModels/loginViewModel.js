define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        usernameValidate: usernameValidate,
        passwordValidate : passwordValidate,
        checkForErrors : checkForErrors
    });

    function validate(attributes, options) {
        this.usernameValidate(attributes);
        this.passwordValidate(attributes);
        this.checkForErrors();
    }

    function usernameValidate(attributes) {
        if (attributes.username.length < 10 && attributes.username.length !== 0) {
            this.set('usernameError', 'Too Short.', {validate:false});
            $('#loginUsername').addClass('error');
        } else {
            this.set('usernameError', '', {validate:false});
            $('#loginUsername').removeClass('error');
        }
    }

    function passwordValidate(attributes) {
        if (attributes.password.length < 10 && attributes.password.length !== 0) {
            this.set('passwordError', 'Too Short.', {validate:false});
            $('#loginPassword').addClass('error');
        } else {
            this.set('passwordError', '', {validate:false});
            $('#loginPassword').removeClass('error');
        }
    }

    function checkForErrors() {
        if (this.get('usernameError') || this.get('passwordError')) {
            this.set('hasError', true, {validate:false});
        } else {
            this.set('hasError', false, {validate:false});
        }
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
