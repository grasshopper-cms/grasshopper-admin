define(['api', 'jquery', 'resources', 'alertBoxView', 'alertBoxViewConfig'],
    function (api, $, resources, AlertBoxView, alertBoxViewConfig) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails
        };

        function getCurrentUserDetails (UserModel) {
            var token = localStorage.authToken;
            if (token) {
                api.authenticateToken(token)
                    .done(function (data) {
                        UserModel.set({
                            id : data._id,
                            email : data.email,
                            enabled : data.enabled,
                            login : data.login,
                            name : data.name,
                            password : data.password,
                            role : data.role
                        });

                        UserModel.trigger('change:userInfoRetrieved');
                    })
                    .fail(function (xhr) {
                        // TODO: Error handling for this. Getting of the current users details.
                    });
            }
        }

    });