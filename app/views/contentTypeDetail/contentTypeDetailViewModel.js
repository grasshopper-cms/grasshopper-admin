define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'plugins', 'underscore'],
    function (GrasshopperModel, resources, constants, masseuse, plugins, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return GrasshopperModel.extend({
        idAttribute : '_id',
        defaults : {
            resources : resources,
            plugins : plugins.fields,
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.contentTypes + '/' + id;
            }),
            saving : false
        },
        toJSON : toJSON,
        urlRoot : constants.api.contentTypes.url
    });

    function toJSON() {
        var json = GrasshopperModel.prototype.toJSON.apply(this);

        return _.omit(json, ['swapElement', 'swapText']);
    }

});