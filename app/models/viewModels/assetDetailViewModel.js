define(['grasshopperModel', 'resources', 'computedProperty', 'underscore', 'constants'], function (Model, resources, ComputedProperty, _, constants) {
    return Model.extend({
        defaults: {
            resources : resources,
            fileName : new ComputedProperty(['url'], function(url) {
                return (url) ? _.last(url.split('/')) : '';
            }),
            id : new ComputedProperty(['fileName'], function(fileName) {
                return (fileName) ? fileName : '';
            })
        },
        urlRoot : buildUrl
    });

    function buildUrl() {
        return constants.api.assets.url.replace(':id', this.get('nodeId'));
    }

});