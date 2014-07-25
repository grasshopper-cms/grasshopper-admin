define([
    'grasshopperModel', 'masseuse', 'resources', 'constants'
], function (Model, masseuse, resources, constants) {

    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
        idAttribute : '_id',
        defaults : {
            login : false,
            role : false,
            enabled : false,
            email : false,
            loggedIn : new ComputedProperty(['enabled'], function (enabled) {
                return enabled;
            }),
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.user + '/' + id;
            })
        }
    });

});
