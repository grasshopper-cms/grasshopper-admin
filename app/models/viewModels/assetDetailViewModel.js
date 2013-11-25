define(['grasshopperModel', 'resources', 'computedProperty', 'underscore'], function (Model, resources, ComputedProperty, _) {
    return Model.extend({
        defaults: {
            resources : resources,
            fileName : new ComputedProperty(['url'], function(url) {
                return (url) ? _.last(url.split('/')) : '';
            })
        }
    });

});