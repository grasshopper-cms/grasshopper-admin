define([
    'masseuseModel',
    'validation',
    'computedProperty',
    'resources',
    'constants'
], function (Model, validation, ComputedProperty, resources, constants) {

    'use strict';
    return Model.extend({
        idAttribute : '_id',
        urlRoot : constants.api.user.url,
        url : constants.api.user.url,
        defaults : {
            login : false,
            role : false,
            enabled : false,
            email : false,
            loggedIn : new ComputedProperty(['enabled'], function (attribute) {
                return attribute;
            }),
            isAdmin : new ComputedProperty(['role'], function (attribute) {
                return resources.user.roles.admin == attribute;
            }),
            isReader : new ComputedProperty(['role'], function (attribute) {
                return resources.user.roles.reader == attribute;
            }),
            urlLink : new ComputedProperty(['_id'], function (attribute) {
                return '#' + constants.api.user.shortUrl + attribute;
            })
        }
    });

});
