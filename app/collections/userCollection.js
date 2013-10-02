define(['backbone', 'UserModel', 'resources'], function (Backbone, UserModel, resources) {

    var defaults = {
        pageSize : 5,
        skipPages : 0,
        url : resources.api.users.url
    };

    return Backbone.Collection.extend({
        model : UserModel,
        fetch : fetch,
        url : defaults.url,
        totalResults : null,
        currentPage : null,
        comparator : function (model) {
            return model.get('name');
        },
        initialize : function () {
            this._paginator = {};
        },
        put : function (prop, value) {
            this._paginator[prop] = value;
        },
        grab : function (prop) {
            return this._paginator[prop];
        }

    });

    function fetch (options) {
        var args = Array.prototype.slice.call(arguments, 0);
        var fetchOptions = {};

        fetchOptions.data = {
            limit : defaults.pageSize,
            skip : defaults.skipPages
        };

        fetchOptions.headers = {
            'Authorization' : 'Token ' + localStorage.authToken
        };

        fetchOptions.success = function (collection, response, options) {

            collection.put('totalResults', response.total);
            collection.put('totalPages', Math.ceil(response.total / defaults.pageSize));
            collection.put('currentPage', (options.data.skip / options.data.limit) + 1);

            var pages = _.range(1, collection.grab('totalPages') + 1);

            pages = _.map(pages, function (page) {
                return {
                    page : page,
                    current : (page == (options.data.skip / options.data.limit) + 1),
                    link : '#users/page/' + page
                };
            });

            collection.put('pages', pages);
        };

        if (options) {
            _.extend(fetchOptions.data, options.data, {skip : (options.data.page - 1) * defaults.pageSize});
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }
        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

});
