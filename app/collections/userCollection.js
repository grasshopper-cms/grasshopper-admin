define(['UserModel', 'resources'], function (UserModel, resources) {

    return Backbone.Collection.extend({
        model : UserModel,
        fetch : fetch,
        url : resources.api.users.url

    });

    function fetch (options) {
        var args = Array.prototype.slice.call(arguments, 0);
        var fetchOptions = (options ||  {});

        var data = (fetchOptions.data || {
            limit : resources.collections.user.defaults.limit,
            skip : resources.collections.user.defaults.skip
        });
        fetchOptions.data = data;

        var headers = (fetchOptions.headers || {
            'Authorization' : 'Token ' + localStorage.authToken
        });

        fetchOptions.headers = headers;
        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

});
