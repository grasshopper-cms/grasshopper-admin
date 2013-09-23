define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig','UserModel', 'app'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig, UserModel, app) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel) {
      api.getToken(loginModel.get('username'), loginModel.get('password'))
          .done(function(data){
              if ("Token" === data.token_type) {
                  //store the token in localstorage
                  localStorage.authToken = data.access_token;
                  Backbone.navigate("", {trigger: true});
              }
          })
          .fail(function(xhr){
              throwLoginError(xhr);
          });
    }

    function throwLoginError(xhr) {
        var alertBoxView = new AlertBoxView(alertBoxViewConfig);
        alertBoxView.model.set('loginError', resources.api.login.errors[xhr.status] );
        alertBoxView.start();
        alertBoxView.rivetView();
    }
});