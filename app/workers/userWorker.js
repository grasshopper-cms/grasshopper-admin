define(['api', 'jquery', 'resources', 'alertBoxView', 'alertBoxViewConfig'],
    function (api, $, resources, AlertBoxView, alertBoxViewConfig) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            displayProfile : displayProfile
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

        function displayProfile(userModel) {
            // Check if the user trying to access the profile is either
            //   a administrator
            //   the current user
//            if (app.user.role === 'administrator' || app.user.id === id) {
//                console.log("YOU SHALL NOT PASS!!");
//            }
            console.log(userModel);

            // get the users details.
            // instantiate the userDetail view
            // populate the userDetailModel

            // Route to the userDetail page
            //   bind the RivetsView
            //   Start the view.
        }
    });