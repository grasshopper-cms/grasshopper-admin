define(['api'],function (api) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(u,p,userModel) {
        api.login(u,p)
            .done(console.log('yay'))
            .fail(console.log('no!'));
    }
});