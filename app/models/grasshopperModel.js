define([
    'masseuseModel',
    'validation',
    'computedProperty',
    'resources',
    'constants',
    'LocalStorage'
], function (Model, validation, ComputedProperty, resources, constants, LocalStorage) {

    'use strict';
    return Model.extend({
        fetch : fetch,
        save : save
    });

    function fetch (options) {
        var token = LocalStorage.get('authToken'),
            args = Array.prototype.slice.call(arguments, 0),
            fetchOptions = {
                data: {},
                headers: {
                    'Authorization' :  'Token ' + token
                },
                success: function(){

                }
            };

        if (options) {
            _.extend(fetchOptions.data, options.data);
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }

        args[0] = fetchOptions;
        return Backbone.Model.prototype.fetch.apply(this, args);
    }

    function save (options) {
        var saveOptions = {headers : {
                'Authorization' : 'Token ' + LocalStorage.get('authToken')
            }};
        return Backbone.Model.prototype.save.call(this, null, saveOptions);
    }

});