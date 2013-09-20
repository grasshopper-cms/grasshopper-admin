define(['api', 'jquery','emptyView','emptyViewConfig'],
    function (api, $, EmptyView, emptyViewConfig) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel,userModel) {

      api.login(loginModel.get('username'), loginModel.get('password'), userModel)
          .done(function(){
              // redirect to empty view
              // Can always load empty up front
              // Final file will be min concated anyway
              var emptyView = new EmptyView(emptyViewConfig);
              emptyView.start();
              emptyView.rivetView();
              console.log('done');
          })
          .fail(function(error){
              loginModel.set('loginError', error);
          });
    }
});