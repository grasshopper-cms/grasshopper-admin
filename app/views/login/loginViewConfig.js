/*global define:false*/
define(['text!views/login/loginView.html', 'loginViewModel'], function (templateHtml, loginViewModel) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {},
        // for model attribute errors on self validating models, follow the convention of attribute+"Error".
        // See the rivetView "publish" method
        ModelType : loginViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'click #loginButton' : 'login'
        },
        appendView : true,
        bindings : [
        ],
        rivetConfig : 'auto'
    };
});