define(['api', 'resources', 'UserModel', 'userCollection', 'LocalStorage'],
    function (Api, resources, UserModel, UserCollection, LocalStorage) {
        'use strict';

        return {
            getUsers : getUsers
        };

        function getUsers (view, options, deferred) {
            var userCollection = new UserCollection();
            userCollection.paginationConfig.pageSize = options.data.limit;

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
