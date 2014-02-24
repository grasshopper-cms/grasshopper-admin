define([
    'backbone', 'validation', 'resources', 'constants',
    'underscore', 'helpers'
], function (Backbone, validation, resources, constants, _, helpers) {

    'use strict';

    var Model = Backbone.Collection,
        LocalStorage = helpers.localStorage;

    return Model.extend({
        fetch : fetch,
        save : save,
        destroy : destroy
    });

    function fetch (options) {
        var token = LocalStorage.get('authToken'),
            args = Array.prototype.slice.call(arguments, 0),
            fetchOptions = {
                data : {},
                headers : {
                    'Authorization' : 'Token ' + token
                },
                success : function () {

                }
            };

        if (options) {
            _.extend(fetchOptions.data, options.data);
            _.extend(fetchOptions.headers, options.headers);
            _.extend(fetchOptions.success, options.success);
        }

        args[0] = fetchOptions;
        return Backbone.Collection.prototype.fetch.apply(this, args);
    }

    function save () {
        // TODO: look at filmfreshModel for reference on how to support passing in objects
        var saveOptions = {headers : {
            'Authorization' : 'Token ' + LocalStorage.get('authToken')
        }};
        return Backbone.Collection.prototype.save.call(this, null, saveOptions);
    }

    function destroy (options) {
        options = options || {};
        options.headers = _.extend({}, options.headers, {
            'Authorization' : 'Token ' + LocalStorage.get('authToken')
        });
        return Backbone.Collection.prototype.destroy.call(this, options);
    }

});