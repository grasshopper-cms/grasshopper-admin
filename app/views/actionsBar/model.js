define(['grasshopperModel', 'resources'], function (GrasshopperModel, resources) {
    'use strict';

    return GrasshopperModel.extend({
        defaults : {
            resources : resources
        }
    });

});