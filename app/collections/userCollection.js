define(['backbone', 'UserModel', 'resources'], function (Backbone, UserModel, resources) {

    return Backbone.Collection.extend({
        model : UserModel,
        fetch : fetch,
        url : resources.api.users.url

    });

    function fetch (options) {
        var args = Array.prototype.slice.call(arguments, 0);
        var fetchOptions = (options ||  {});

        // TODO: use _.extend
        var data = (fetchOptions.data || {
            limit : resources.collections.user.defaults.limit,
            skip : resources.collections.user.defaults.skip
        });
        fetchOptions.data = data;

        // TODO: use _.extend
        var headers = (fetchOptions.headers || {
            // TODO: create a localStorage wrapper - There is a already a small library for this
            'Authorization' : 'Token ' + localStorage.authToken
        });

        fetchOptions.headers = headers;
        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

});
