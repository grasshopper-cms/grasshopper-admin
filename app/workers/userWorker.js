define(['api', 'jquery', 'resources', 'alertBoxView', 'alertBoxViewConfig','UserModel', 'app'],
    function (api, $, resources, AlertBoxView, alertBoxViewConfig, UserModel, app) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails
        };

        function getCurrentUserDetails() {
            var token = localStorage.authToken;
            if (token) {
                api.authenticateToken(token)
                    .done(function(data){
                        app.user = new UserModel({
                            id : data._id,
                            email : data.email,
                            enabled : data.enabled,
                            login : data.login,
                            name : data.name,
                            password : data.password,
                            role : data.role
                        });
                        app.trigger('change:userInfoRetrieved');
                    })
                    .fail(function(xhr){
                        // TODO: Error handling for this. Getting of the current users details.
                    });
            }
        }
    });