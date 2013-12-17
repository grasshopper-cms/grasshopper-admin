define(['api', 'resources', 'UserModel', 'userCollection', 'masseuse'],
    function (Api, resources, UserModel, UserCollection, masseuse) {
        'use strict';

        var LocalStorage = masseuse.localStorage;
        return {
            getUsers : getUsers
        };

        function getUsers (view, options, deferred) {
            var userCollection = new UserCollection();
            userCollection.paginationConfig.pageSize = options.data.limit;

            // TODO: I really want to delete this. Because the AuthToken should be set in the grasshopperModel.
            // However, because this UserCollection extends from the Masseuse PaginatedCollection.
            // The PaginatedCollection already overrides the BackboneFetch method with stuff.
            // So I cannot pass the fetch in by default for Grasshopper. This is duplicated Code.
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