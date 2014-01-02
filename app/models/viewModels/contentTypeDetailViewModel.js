define(['grasshopperModel', 'resources', 'constants', 'masseuse'], function (Model, resources, constants, masseuse) {
    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
        idAttribute : '_id',
        defaults : {
            resources : resources,
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.contentTypes + '/' + id;
            })
        },
        urlRoot : constants.api.contentTypes.url
    });

});