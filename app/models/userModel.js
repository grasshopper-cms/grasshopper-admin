define([
    'grasshopperModel', 'masseuse', 'resources', 'constants'
], function (Model, masseuse, resources, constants) {

    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
        idAttribute : '_id',
        defaults : {
            username : false,
            role : false,
            enabled : false,
            email : false,
            profile : {},
            loggedIn : new ComputedProperty(['enabled'], function (enabled) {
                return enabled;
            }),
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.user + '/' + id;
            })
        }
    });

});
