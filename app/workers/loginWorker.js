define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig', 'userWorker'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig, userWorker) {
    'use strict';

    return {
        doLogin : doLogin,
        authenticateWithToken : authenticateWithToken
    };

    function doLogin(loginModel) {

      api.getToken(loginModel.get('username'), loginModel.get('password'))
          .done(function(data){
              if ("Token" === data.token_type) {
                  //store the token in localstorage
                  localStorage.setItem('authToken', data.access_token);
                  authenticateWithToken();
              }
          })
          .fail(function(xhr){

              var alertBoxView = new AlertBoxView(alertBoxViewConfig);
              alertBoxView.model.set('loginError', resources.api.login.errors[xhr.status] );
              alertBoxView.start();
              alertBoxView.rivetView();
          });
    }

    function authenticateWithToken() {
        var token = localStorage.getItem('authToken');
        if (token) {
            api.authenticateToken()
                .done(function(){
                    var emptyView;
                    emptyView = new EmptyView(emptyViewConfig);
                    emptyView.start();
                    emptyView.rivetView();
                })
                .fail(function(){

                });
        }
    }
});