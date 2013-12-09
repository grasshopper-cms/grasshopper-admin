define([
    'masseuse',
    'validation',
    'resources',
    'constants',
    'underscore'
], function (masseuse, validation, resources, constants, _) {

    'use strict';

    var Model = masseuse.MasseuseModel,
        ComputedProperty = masseuse.ComputedProperty,
        LocalStorage = masseuse.localStorage;

    return Model.extend({
        fetch : fetch,
        save : save,
        destroy : destroy
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
        // TODO: look at filmfreshModel for reference on how to support passing in objects
        var saveOptions = {headers : {
                'Authorization' : 'Token ' + LocalStorage.get('authToken')
            }};
        return Backbone.Model.prototype.save.call(this, null, saveOptions);
    }

    function destroy (options) {
        options = options || {};
        options.headers = _.extend({}, options.headers, {
            'Authorization' : 'Token ' + LocalStorage.get('authToken')
        });
        return Backbone.Model.prototype.destroy.call(this, options);
    }
});