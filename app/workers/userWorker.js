define(['api', 'jquery', 'resources', 'alertBoxView', 'alertBoxViewConfig','UserModel', 'app'],
    function (api, $, resources, AlertBoxView, alertBoxViewConfig, UserModel, app) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            displayProfile : displayProfile
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

        function displayProfile(id) {
            // Check if the user trying to access the profile is either
            //   a administrator
            //   the current user
            if (app.user.role === 'administrator' || app.user.id === id) {
                console.log("YOU SHALL NOT PASS!!");
            }

            // get the users details.
            // instantiate the userDetail view
            // populate the userDetailModel

            // Route to the userDetail page
            //   bind the RivetsView
            //   Start the view.
        }
    });