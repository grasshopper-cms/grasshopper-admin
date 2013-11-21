define(['grasshopperModel', 'resources', 'constants'], function (Model, resources, constants) {
    return Model.extend({
        defaults: {
            resources: resources
        },
        url : constants.api.assets.url
    });

});