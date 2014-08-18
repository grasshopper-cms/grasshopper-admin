define(['grasshopperModel', 'resources'], function (GrasshopperModel, resources) {
    'use strict';

    return GrasshopperModel.extend({
        initialize: initialize,
        defaults: {
            resources: resources,
            clipboardContent: {}
        }
    });

    function initialize() {
        GrasshopperModel.prototype.initialize.apply(this, arguments);
    }

});