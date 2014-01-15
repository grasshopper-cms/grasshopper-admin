define(['grasshopperModel', 'resources', 'constants'], function (Model, resources, constants) {
    'use strict';
    return Model.extend({
        defaults : {
            resources : resources,
            fields : {}
        },
        urlRoot : constants.api.content.url
    });
});