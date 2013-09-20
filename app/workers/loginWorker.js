define(['api', 'jquery','emptyView','emptyViewConfig'],
    function (api, $, EmptyView, emptyViewConfig) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel,userModel) {

      api.getToken(loginModel.get('username'), loginModel.get('password'))
          .done(function(data){
              var emptyView;
              // redirect to empty view
              // Can always load empty up front
              // Final file will be min concated anyway
              if ("Token" === data.token_type) {
                  //store the token in localstorage
                  localStorage.setItem('authToken', data.access_token);
                  emptyView = new EmptyView(emptyViewConfig);
                  emptyView.start();
                  emptyView.rivetView();
                  console.log('done');


              }
          })
          .fail(function(error){
              loginModel.set('loginError', error);
          });
    }
});