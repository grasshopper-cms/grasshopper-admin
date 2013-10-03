define([
    'masseuseModel',
    'validation',
    'computedProperty',
    'resources',
    'constants'
], function (Model, validation, ComputedProperty, resources, constants) {

    'use strict';
    return Model.extend({
        urlRoot : constants.api.user.url,
        url : constants.api.user.url,
        defaults : {
            login : false,
            role : false,
            name : false,
            enabled : false,
            email : false,
            password : false,
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
