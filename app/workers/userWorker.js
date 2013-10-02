define(['api', 'resources', 'UserModel', 'userCollection'],
    function (api, resources, UserModel, UserCollection) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            isValidProfileEditor : isValidProfileEditor,
            getRequestedUserDetails : getRequestedUserDetails,
            getMyUserDetails : getMyUserDetails,
            isThisMyProfile : isThisMyProfile,
            getProfileData : getProfileData,
            getUsers : getUsers,
            updateUserDetails : updateUserDetails,
            updateModel : updateModel

        };

        function getCurrentUserDetails (view) {
            if (localStorage.authToken) {
                api.authenticateToken()
                    .done(function (data) {
                        view.app.user.set({
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
                        view.app.router.navigate('login');
                    });
            }
        }

        function updateModel(changedModel, currentLoggedInUser) {
            if (isValidProfileEditor(currentLoggedInUser) || isThisMyProfile(currentLoggedInUser, changedModel.get('id'))) {
                return updateUserDetails(changedModel);
            }
        }

        function updateUserDetails(model) {
            return api.saveUser(model);
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

        function isValidProfileEditor(UserModel) {
            // Check if the user trying to access the profile is either an administrator or the current user
            return UserModel.get('isAdmin');
        }

        function isThisMyProfile(UserModel, id) {
            return (UserModel.get('_id') === id);
        }

        function getRequestedUserDetails (id) {
            return api.getRequestedUserDetails(id);
        }

        function getMyUserDetails () {
            return api.getMyUserDetails();
        }

        function getUsers (view, options) {
            var userCollection = new UserCollection();

            userCollection.fetch(options)
                .done(function(){
                    view.model.set({
                        users : userCollection
                    });
                });
        }

    });