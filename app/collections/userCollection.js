define(['backbone', 'UserModel', 'resources', 'paginatedCollection'], function (Backbone, UserModel, resources, PaginatedCollection) {

    return PaginatedCollection.extend({
        paginationConfig : {
            pageSize : 5,
            skipPages : 0,
            url : resources.api.users.url,
            pageLink : '#users/page/'
        },
        model : UserModel,
        url : resources.api.users.url,
        comparator : function (model) {
            return model.get('name');
        }
    });

});
