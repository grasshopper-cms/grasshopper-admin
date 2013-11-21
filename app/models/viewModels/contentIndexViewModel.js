define(['grasshopperModel', 'resources', 'constants'], function (Model, resources, constants) {
    return Model.extend({
        defaults: {
            resources:resources
        },
        urlRoot: constants.api.nodes.url
    });
});