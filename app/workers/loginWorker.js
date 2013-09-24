define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig', 'router'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig, Router) {
    'use strict';

    return {
        doLogin : doLogin
    };

    function doLogin(loginModel) {
      api.getToken(loginModel.get('username'), loginModel.get('password'))
          .done(function(data){
              if ("Token" === data.token_type) {
                  localStorage.authToken = data.access_token;
                  // TODO: THIS DOES NOT REDIRECT, A DECISION NEEDS TO BE MADE REGARDING PROGRAM FLOW, IE. Is it the login workers responsibility to redirect the user? Or should that be the responsibility of the router?
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