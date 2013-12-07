define([
    'grasshopperModel',
    'validation',
    'masseuse',
    'resources',
    'constants'
], function (Model, validation, masseuse, resources, constants) {

    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
//        url : constants.api.user.url,
        defaults : {
            login : false,
            role : false,
            enabled : false,
            email : false,
            loggedIn : new ComputedProperty(['enabled'], function (enabled) {
                return enabled;
            }),
            isAdmin : new ComputedProperty(['role'], function (role) {
                return resources.user.roles.admin == role;
            }),
            isReader : new ComputedProperty(['role'], function (role) {
                return resources.user.roles.reader == role;
            }),
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.user + '/' + id;
            }),
            // TODO: Do these need to be computed properties? On the backbone docs there seems to be a way of transparent mapping:  id : '_id' should work
            id : new ComputedProperty(['_id'], function(id) {
                return id;
            })
        }
    });

});
