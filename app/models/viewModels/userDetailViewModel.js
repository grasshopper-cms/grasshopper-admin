define(['grasshopperModel', 'constants', 'resources'],
    function (Model, constants, resources) {
        'use strict';
        return Model.extend({
            idAttribute : '_id',
            defaults : {
                resources : resources,
                roles : resources.user.roles,
                enabled : true
            },
            urlRoot : constants.api.users.url
        });
    });