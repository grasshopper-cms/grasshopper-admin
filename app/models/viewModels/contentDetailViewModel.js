define(['grasshopperModel', 'resources', 'constants', 'computedProperty'], function (Model, resources, constants, ComputedProperty) {
    return Model.extend({
        defaults: {
            resources : resources,
            href : new ComputedProperty(['_id'], function(id) {
                return constants.internalRoutes.contentDetail.replace(':id', id);
            })
        }
    });

});