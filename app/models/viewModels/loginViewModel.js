define(['selfValidatingModel', 'jquery'], function (Model, $) {
    return Model.extend({
        validate: validate,
        userNameValidate: userNameValidate,
        passwordValidate : passwordValidate
    });

    function validate(attributes, options) {
       console.log(attributes);
       console.log(this);
       console.log(this.attributes);

    }

    function userNameValidate(attributes) {
    }

    function passwordValidate(attributes) {
    }

    function generalError() {
        this.set('hasError', true, {validate:false});
    }
});
