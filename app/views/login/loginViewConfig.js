/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel'], function (template, loginViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {},
        // for model attribute errors on self validating models, follow the convention of attribute+"Error".
        // See the rivetView "publish" method
        ModelType : loginViewModel,
        browserTitle : 'Sign In',
        appendTo : '#stage',
        wrapper : false,
        template : template,
        events : {},
        listeners : [
        ]
    };
});