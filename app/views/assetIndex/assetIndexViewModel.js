define(['grasshopperModel', 'grasshopperCollection', 'resources', 'constants', 'assetDetailViewModel',
        'masseuse', 'underscore'],
    function (GrasshopperModel, GrasshopperCollection, resources, constants, assetDetailViewModel,
              masseuse, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return GrasshopperModel.extend({
        initialize: initialize,
        defaults : {
            resources : resources,
            emptyAssetsLink : new ComputedProperty(['nodeId'], function(nodeId) {
                return constants.internalRoutes.createAssets.replace(':id', nodeId);
            })
        }
    });

    function initialize() {
        var self = this;
        GrasshopperModel.prototype.initialize.apply(this, arguments);
        this.set('childAssets', new (GrasshopperCollection.extend({
            model : function(attrs, options) {
                return new assetDetailViewModel(_.extend(attrs, { nodeId : self.get('nodeId') }), options);
            },
            url : function() {
                return constants.api.assets.url.replace(':id', self.get('nodeId'));
            }
        }))());

        this.get('childAssets').on('add remove change reset', function() {
            self.set('hasAssets', self.get('childAssets').length > 0);
        });
    }
});