/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel'], function (templateHtml, loginViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {username : '', password : '', usernameError : '', passwordError : '', hasError : '', loginError : ''},
        ModelType : loginViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'click #loginButton' : 'login'
        }
    };
});