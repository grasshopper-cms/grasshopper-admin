define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig','UserModel', 'app'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig, UserModel, app) {
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
              throwLoginError(xhr);
          });
    }

    function authenticateWithToken() {
        var token = localStorage.getItem('authToken');
        if (token) {
            api.authenticateToken(token)
                .done(function(data){
                    var emptyView;
                        app.user = new UserModel({
                            id : data._id,
                            email : data.email,
                            enabled : data.enabled,
                            login : data.login,
                            name : data.name,
                            password : data.password,
                            role : data.role
                        });

                    emptyView = new EmptyView(emptyViewConfig);
                    emptyView.start();
                    emptyView.rivetView();
                })
                .fail(function(xhr){
                    throwLoginError(xhr);
                });
        }
    }

    function throwLoginError(xhr) {
        var alertBoxView = new AlertBoxView(alertBoxViewConfig);
        alertBoxView.model.set('loginError', resources.api.login.errors[xhr.status] );
        alertBoxView.start();
        alertBoxView.rivetView();
    }
});