/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel'], function (templateHtml, loginViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {userName : '', password : '', error : ''},
        ModelType : loginViewModel,
        el : '#stage',
        templateHtml : templateHtml
    };
});