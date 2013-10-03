define(['backbone', 'UserModel', 'constants', 'paginatedCollection'], function (Backbone, UserModel, constants, PaginatedCollection) {

    return PaginatedCollection.extend({
        paginationConfig : {
            pageSize : 5,
            skipPages : 0,
            url : constants.api.users.url,
            pageLink : '#users/page/'
        },
        model : UserModel,
        url : constants.api.users.url
    });

});
