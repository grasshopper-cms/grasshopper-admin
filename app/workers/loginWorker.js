define(['api', 'jquery'],function (api, $) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel,userModel) {

      api.login(loginModel.get('username'), loginModel.get('password'), userModel)
          .done(function(){console.log('done')})
          .fail(function(){});
    }
});