define(['grasshopperModel', 'masseuse', 'resources', 'constants', 'clipboardWorker'], function (GrasshopperModel, masseuse, resources, constants, clipboardWorker) {
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