define(['grasshopperModel', 'resources', 'computedProperty', 'constants'], function (Model, resources, ComputedProperty, constants) {
    return Model.extend({
        defaults: {
            resources : resources,
            href : new ComputedProperty(['_id'], function(id) {
                return constants.internalRoutes.nodeDetail.replace(':id', id);
            })
        }
    });

});