define(['backbone', 'UserModel', 'constants', 'paginatedCollection'], function (Backbone, UserModel, constants, PaginatedCollection) {

    return PaginatedCollection.extend({
        paginationConfig : {
            pageSize : constants.userCollection.pageSize,
            skipPages :  constants.userCollection.skipPages,
            url : constants.api.users.url,
            pageLink : constants.userCollection.pageLink,
            showLink : constants.userCollection.showLink,
            pageLimits : constants.userCollection.pageLimits
        },
        model : UserModel,
        url : constants.api.users.url,
        fetch : fetch
    });

    // This could be moved into a GH paginateCollection if it is need in one more place
    function fetch(options) {
        options = options || {};

        options.headers = {
            'Authorization' : 'Token ' + LocalStorage.get('authToken')
        };

        PaginatedCollection.prototype.fetch.apply(this, options);
    }
});
