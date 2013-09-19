define(['api', 'jquery'],function (api, $) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel,userModel) {

      api.login(loginModel.get('username'), loginModel.get('password'), userModel)
          .done(function(){
              // redirect to empty view
              require([
                  'emptyView',
                  'emptyViewConfig',
              ], function (emptyView, emptyViewConfig) {

                  var emptyView = new emptyView(emptyViewConfig);
                  emptyView.start();
                  emptyView.rivetView();

              });
              console.log('done');
          })
          .fail(function(error){
              loginModel.set('loginError', error);
          });
    }
});