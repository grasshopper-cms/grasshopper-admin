define(['grasshopperModel', 'resources', 'constants', 'computedProperty'], function (Model, resources, constants, ComputedProperty) {
    return Model.extend({
        idAttribute : '_id',
        defaults: {
            resources : resources,
            href : new ComputedProperty(['_id'], function(id) {
                return constants.internalRoutes.contentDetail.replace(':id', id);
            }),
            statusClass : new ComputedProperty(['status'], function(status) {
                return (status != 'Live') ? 'inactive' : '';
            })
        },
        urlRoot: constants.api.content.url
    });

});