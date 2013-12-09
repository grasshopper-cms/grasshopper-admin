define(['grasshopperModel', 'resources'], function (Model, resources) {
    return Model.extend({
        defaults: {
            resources : resources
        }
    });
});