define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection',
    'nodeDetailViewModel', 'contentDetailViewModel', 'assetDetailViewModel', 'underscore'],
    function (Model, resources, constants, GrasshopperCollection,
              nodeDetailViewModel, contentDetailViewModel, assetDetailViewModel, _) {

    'use strict';

    return Model.extend({
        initialize : initialize,
        idAttribute : 'nodeId',
        defaults : {
            resources : resources,
            constants : constants
        },
        urlRoot : constants.api.node.url
    });

    function initialize() {
        var self = this;

        this.set('childNodes', new (GrasshopperCollection.extend({
            model : nodeDetailViewModel,
            url : function() {
                return constants.api.nodesChildren.url.replace(':id', self.get('nodeId'));
            }
        }))());

        this.set('childContent', new (GrasshopperCollection.extend({
            model : contentDetailViewModel,
            url : function() {
                return constants.api.nodesContent.url.replace(':id', self.get('nodeId'));
            }
        }))());

        this.set('childAssets', new (GrasshopperCollection.extend({
            model : function(attrs, options) {
                return new assetDetailViewModel(_.extend(attrs, { nodeId : self.get('nodeId') }), options);
            },
            url : function() {
                return constants.api.assets.url.replace(':id', self.get('nodeId'));
            }
        }))());
    }

});