define(['grasshopperModel', 'resources', 'backbone', 'constants', 'plugins/embeddedcontent/nodeModel',
    'grasshopperCollection'],
    function (Model, resources, Backbone, constants, nodeModel,
              grasshopperCollection) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            showTree : false,
            _id : '0'
        },
        urlRoot : constants.api.node.url
    });

    function initialize() {
        var self = this;
        Model.prototype.initialize.apply(this, arguments);
        this.set('children', new (grasshopperCollection.extend({
            model : nodeModel,
            url : function() {
                return constants.api.nodes.url.replace(':id', self.get('_id'));
            }
        }))());
    }
});