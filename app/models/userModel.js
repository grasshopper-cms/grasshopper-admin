define(['masseuseModel', 'validation', 'ComputedProperty', 'resources'], function (Model, validation, ComputedProperty, resources) {

    'use strict';
    return Model.extend({
        defaults : {
            urlRoot : resources.api.user.url,
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
                return '#' + resources.api.user.shortUrl + attribute;
            })
        }

    });

});
