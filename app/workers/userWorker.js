define(['api', 'resources', 'UserModel', 'backbone', 'userCollection'],
    function (api, resources, UserModel, Backbone, UserCollection) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            isValidProfileEditor : isValidProfileEditor,
            getRequestedUserDetails : getRequestedUserDetails,
            getMyUserDetails : getMyUserDetails,
            isThisMyProfile : isThisMyProfile,
            getProfileData : getProfileData,
            getUsers : getUsers,
            saveUser : saveUser
        };

        function getCurrentUserDetails (UserModel) {
            if (localStorage.authToken) {
                api.authenticateToken()
                    .done(function (data) {
                        UserModel.set({
                            _id : data._id,
                            email : data.email,
                            enabled : data.enabled,
                            login : data.login,
                            name : data.name,
                            password : data.password,
                            role : data.role
                        });

                    })
                    .fail(function (xhr) {
                        // TODO: Error handling for this. Getting of the current users details.
                    });
            }
        }

        //THIS IS NOT YET IMPLEMENTED NEEDS TO BE FINISHED WHEN THERE ARE METHODS PRESENT TO SAVE A USER
        function saveUser() {
            console.log('saving User');
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

        function getUsers (view, options) {
            var userCollection = new UserCollection();
            view.model.set('users', userCollection);
            userCollection.fetch(options);
        }

    });