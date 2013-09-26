define(['api', 'resources'],
    function (api, resources) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            isValidProfileEditor : isValidProfileEditor,
            getRequestedUserDetails : getRequestedUserDetails,
            getMyUserDetails : getMyUserDetails,
            isThisMyProfile : isThisMyProfile,
            getProfileData : getProfileData
        };

        function getCurrentUserDetails (UserModel) {
            if (localStorage.authToken) {
                api.authenticateToken()
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

        /**
         *  Runner method for getting user details.
         *  Decides if you are a user accessing your own account, or if you are an admin accessing someone else's.
         */
        function getProfileData(UserModel, id) {
            if (isThisMyProfile(UserModel, id)) {
                return getMyUserDetails();
            } else if (isValidProfileEditor(UserModel)) {
                return getRequestedUserDetails(id);
            }
        }

        // TODO: make this computed property too
        function isValidProfileEditor(UserModel) {
            // Check if the user trying to access the profile is either an administrator or the current user
            return (UserModel.get('role') === resources.user.roles.admin);
        }

        function isThisMyProfile(UserModel, id) {
            return (UserModel.get('id') === id);
        }

        function getRequestedUserDetails (id) {
            return api.getRequestedUserDetails(id);
        }

        function getMyUserDetails () {
            return api.getMyUserDetails();
        }

    });