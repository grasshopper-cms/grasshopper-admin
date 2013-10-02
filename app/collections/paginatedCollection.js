define(['backbone', 'UserModel', 'resources', 'underscore'], function (Backbone, UserModel, resources, _) {

    return Backbone.Collection.extend({
        // make sure you override this empty config with necessary information
        paginationConfig : {
            pageSize : '', // results per page
            skipPages : '', // number of results to skip
            url : '', // endpoint
            pageLink : '' // paginated page numbers link, example : '#users/page/'. this automatically concats with its page number in the fetch success method to create -> '#users/page/3'
        },
        fetch : fetch,
        initialize : function () {
            this._paginator = {};
        },
        put : function (prop, value) {
            this._paginator[prop] = value;
        },
        grab : function (prop) {
            return this._paginator[prop];
        },
        comparator : function (model) {
            return model.get(_.keys(model.attributes)[0]); // default comparator sorts by first attribute in model
        }

    });

    function fetch (options) {
        var args = Array.prototype.slice.call(arguments, 0);
        var fetchOptions = {};

        fetchOptions.data = {
            limit : this.paginationConfig.pageSize,
            skip : this.paginationConfig.skipPages
        };

        fetchOptions.headers = {
            'Authorization' : 'Token ' + localStorage.authToken
        };

        fetchOptions.success = function (collection, response, options) {

            collection.put('totalResults', response.total);
            collection.put('totalPages', Math.ceil(response.total / collection.paginationConfig.pageSize));
            collection.put('currentPage', (options.data.skip / options.data.limit) + 1);

            var pages = _.range(1, collection.grab('totalPages') + 1);

            pages = _.map(pages, function (page) {
                return {
                    page : page,
                    current : (page == (options.data.skip / options.data.limit) + 1),
                    link : collection.paginationConfig.pageLink + page
                };
            });

            collection.put('pages', pages);
        };

        if (options) {
            _.extend(fetchOptions.data, options.data, {skip : (options.data.page - 1) * this.paginationConfig.pageSize});
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }
        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

});
