define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel) {

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
              }
          })
          .fail(function(xhr){

              var alertBoxView = new AlertBoxView(alertBoxViewConfig);
              alertBoxView.model.set('loginError', resources.api.login.errors[xhr.status] );
              alertBoxView.start();
              alertBoxView.rivetView();
          });
    }
});