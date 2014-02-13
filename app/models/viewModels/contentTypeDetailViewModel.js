define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'plugins'],
    function (Model, resources, constants, masseuse, plugins) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        idAttribute : '_id',
        defaults : {
            resources : resources,
            plugins : plugins.fields,
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.contentTypes + '/' + id;
            })
        },
        urlRoot : constants.api.contentTypes.url
    });

});