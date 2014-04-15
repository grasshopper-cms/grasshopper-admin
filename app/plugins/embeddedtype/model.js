define(['grasshopperModel', 'resources', 'constants'], function (Model, resources, constants) {
    'use strict';

    return Model.extend({
        idAttribute : 'options',
        defaults : {
            resources : resources
        },
        urlRoot : constants.api.contentTypes.url
    });

});