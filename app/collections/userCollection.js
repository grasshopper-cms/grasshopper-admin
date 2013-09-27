define(['userModel', 'resources'], function (UserModel, resources) {

    return Backbone.Collection.extend({
        model : UserModel,
        fetch : fetch,
        url : resources.api.users.url

    });

    function fetch (options) {
        options || (options = {
            data : {
                limit : resources.collections.user.defaults.limit,
                skip : resources.collections.user.defaults.skip
            },
            headers : {
                'Authorization' : 'Token ' + localStorage.authToken
            }
        });

        return Backbone.Collection.prototype.fetch.call(this, options);
    }

});
