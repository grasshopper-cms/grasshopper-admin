define([
    'backbone', 'masseuse', 'validation', 'resources', 'constants',
    'underscore', 'helpers'
], function (Backbone, masseuse, validation, resources, constants, _, helpers) {

    'use strict';

    var Model = masseuse.MasseuseModel,
        LocalStorage = helpers.localStorage;

    return Model.extend({
        fetch : fetch,
        save : save,
        destroy : destroy,
        toJSON : toJSON
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
        return Backbone.Model.prototype.fetch.apply(this, args);
    }

    function save () {
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

    function toJSON() {
        return _.clone(_.omit(this.attributes, 'resources', 'contants', 'schema'));
    }
});