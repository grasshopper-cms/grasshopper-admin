define(['grasshopperModel', 'resources', 'underscore', 'constants', 'masseuse'],
    function (Model, resources, _, constants, masseuse) {
        'use strict';
        var ComputedProperty = masseuse.ComputedProperty;
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