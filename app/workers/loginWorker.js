define(['api', 'jquery','emptyView','emptyViewConfig', 'resources', 'alertBoxView', 'alertBoxViewConfig', 'app', 'UserModel'],
    function (api, $, EmptyView, emptyViewConfig, resources, AlertBoxView, alertBoxViewConfig, App, UserModel) {
    'use strict';

    return {
        doLogin : doLogin,
        doLogout : doLogout
    };

    function doLogin(loginModel) {
        api.getToken(loginModel.get('username'), loginModel.get('password'))
            .done(function(data){
                if ("Token" === data.token_type) {
                    localStorage.authToken = data.access_token;
                    App.trigger('change:loggedIn');
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

    function doLogout() {
        localStorage.authToken = '';
        App.user = new UserModel();
        App.trigger('change:loggedOut');
    }
});