define(['backbone', 'UserModel', 'resources'], function (Backbone, UserModel, resources) {

    var defaults = {
        limit : 5,
        skip : 0,
        url : resources.api.users.url
    };

    return Backbone.Collection.extend({
        model : UserModel,
        fetch : fetch,
        url : defaults.url,
        totalResults : null,
        currentPage : null,
        initialize : function () {
            this._paginator = {};
        },
        put : function (prop, value) {
            this._paginator[prop] = value;
        },
        get : function (prop) {
            return this._paginator[prop];
        }

    });

    function fetch (options) {
        var args = Array.prototype.slice.call(arguments, 0);
        var fetchOptions = {};

        fetchOptions.data = (fetchOptions.data || {
            limit : defaults.limit,
            skip : defaults.skip
        });

        fetchOptions.headers = {
            'Authorization' : 'Token ' + localStorage.authToken
        };

        fetchOptions.success = function (collection, response, options) {

            collection.put('totalResults', response.total);
            collection.put('totalPages', Math.ceil(response.total / defaults.limit));
            collection.put('currentPage', options.data.skip + 1);

            var pages = _.range(1, collection.get('totalPages') + 1);

            pages = _.map(pages, function(page){
                return {
                    page : page,
                    current : (page == options.data.skip + 1)
                };
            });

            collection.put('pages',pages);
        };

        _.extend(fetchOptions, options);
        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

});
