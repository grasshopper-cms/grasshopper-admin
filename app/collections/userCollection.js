define(['backbone', 'UserModel', 'constants', 'masseuse'],
    function (Backbone, UserModel, constants, masseuse) {
        'use strict';
        var PaginatedCollection = masseuse.PaginatedCollection;
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
        url : constants.api.users.url
    });

});
