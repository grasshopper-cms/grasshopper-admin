/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel', 'ComputedProperty'], function (templateHtml, loginViewModel, ComputedProperty) {
    'use strict';

    return {
        name : 'loginView',
        // for model attribute errors on self validating models, follow the convention of attribute+"Error". See the rivetView "publish" method
        modelData : {username : '', password : '', usernameError : '', passwordError : '',
            // hasError is used to great out the submit box
            hasError : new ComputedProperty(['usernameError', 'passwordError'], function(usernameError, passwordError) {
                return !!(usernameError || passwordError);
            })},
        ModelType : loginViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'click #loginButton' : 'login'
        }
    };
});