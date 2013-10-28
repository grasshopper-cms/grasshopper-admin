define(['api', 'resources', 'UserModel', 'userCollection', 'LocalStorage'],
    function (api, resources, UserModel, UserCollection, LocalStorage) {
        'use strict';

        return {
            getCurrentUserDetails : getCurrentUserDetails,
            isValidProfileEditor : isValidProfileEditor,
            getRequestedUserDetails : getRequestedUserDetails,
            getMyUserDetails : getMyUserDetails,
            isThisMyProfile : isThisMyProfile,
            getProfileData : getProfileData,
            getUsers : getUsers
        };

        function getCurrentUserDetails (view) {
            if (LocalStorage.get('authToken')) {
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
            return id === UserModel.get('_id');
        }

        function getRequestedUserDetails (id) {
            return api.getRequestedUserDetails(id);
        }

        function getMyUserDetails () {
            return api.getMyUserDetails();
        }

        function getUsers (view, options, deferred) {
            var userCollection = new UserCollection();
            userCollection.paginationConfig.pageSize = options.data.limit;

            options.headers = {
                'Authorization' : 'Token ' + LocalStorage.get('authToken')
            };

            userCollection.fetch(options)
                .done(function(){
                    view.model.set({
                        users : userCollection
                    });
                    deferred.resolve();

                });

            return deferred.promise();
        }

    });