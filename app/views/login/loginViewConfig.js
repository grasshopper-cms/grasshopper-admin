/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel', 'ComputedProperty', 'validation'], function (templateHtml, loginViewModel, ComputedProperty, validation) {
    'use strict';

    return {
        name : 'loginView',
        // for model attribute errors on self validating models, follow the convention of attribute+"Error". See the rivetView "publish" method
        modelData : {username : '', password : '',
            // Do not compute uE and pE initially be setting 3r parameter to true
            usernameError : new ComputedProperty(['username'], validateUserLoginAttribute, true),
            passwordError : new ComputedProperty(['password'], validateUserLoginAttribute, true),
            // hasError is used to great out the submit box
            hasError : new ComputedProperty(['usernameError', 'passwordError'], checkForErrors)},
        ModelType : loginViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'click #loginButton' : 'login'
        },
        selectorsForCache: ['input', '#login input']
    };

    function validateUserLoginAttribute(attribute) {
        return validation.stringHasLength(attribute) ? undefined : 'Too Short.';
    }

    function checkForErrors(usernameError, passwordError) {
        return !!(usernameError || passwordError);
    }
});