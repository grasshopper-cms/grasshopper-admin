define(['grasshopperModel', 'resources', 'constants', 'computedProperty'], function (Model, resources, constants, ComputedProperty) {
    return Model.extend({
        idAttribute : '_id',
        defaults: {
            resources : resources,
            href : new ComputedProperty(['_id'], function(id) {
                return constants.internalRoutes.contentDetail.replace(':id', id);
            })
        },
        urlRoot: constants.api.content.url
    });

});