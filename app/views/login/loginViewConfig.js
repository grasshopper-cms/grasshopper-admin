/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel'], function (template, loginViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {},
        // for model attribute errors on self validating models, follow the convention of attribute+"Error".
        // See the rivetView "publish" method
        ModelType : loginViewModel,
        appendTo : '#stage',
        wrapper : false,
        template : template,
        events : {
            'click #loginButton' : 'login'
        },
        listeners : [
        ]
    };
});