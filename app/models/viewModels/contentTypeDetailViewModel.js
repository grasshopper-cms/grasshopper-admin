define(['grasshopperModel', 'resources', 'constants', 'computedProperty'], function (Model, resources, constants, ComputedProperty) {
    return Model.extend({
        idAttribute : '_id',
        defaults: {
            resources : resources,
            urlLink : new ComputedProperty(['_id'], function(id) {
                return constants.internalRoutes.contentTypes + '/' + id;
            })
        },
        urlRoot : constants.api.contentTypes.url
    });

});