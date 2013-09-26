define(['api', 'resources'],
    function (api, resources) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            isValidProfileEditor : isValidProfileEditor,
            getRequestedUserDetails : getRequestedUserDetails
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

        // TODO: make this computed property too
        function isValidProfileEditor(UserModel, id) {
            // Check if the user trying to access the profile is either an administrator or the current user
            return (UserModel.get('role') === resources.user.roles.admin || UserModel.id === id);
        }

        function getRequestedUserDetails (id) {
            return api.getRequestedUserDetail(id);
        }

    });