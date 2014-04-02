define(['grasshopperCollection', 'grasshopperModel'], function(GrasshopperCollection, GrasshopperModel) {
    'use strict';

    return GrasshopperCollection.extend({
        model : GrasshopperModel
    });
});