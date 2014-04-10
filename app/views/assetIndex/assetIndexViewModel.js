define(['grasshopperModel', 'grasshopperCollection', 'resources', 'constants', 'assetDetailViewModel'],
    function (GrasshopperModel, GrasshopperCollection, resources, constants, assetDetailViewModel) {
    'use strict';

    return GrasshopperModel.extend({
        initialize: initialize,
        defaults : {
            resources : resources
        }
    });

    function initialize() {
        var self = this;
        GrasshopperModel.prototype.initialize.apply(this, arguments);
        this.set('childAssets', new (GrasshopperCollection.extend({
            model : assetDetailViewModel,
            url : function() {
                return constants.api.assets.url.replace(':id', self.get('nodeId'));
            }
        }))());
    }
});