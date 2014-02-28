define(['grasshopperModel', 'resources', 'backbone', 'constants', 'grasshopperCollection'],
    function (Model, resources, Backbone, constants, grasshopperCollection) {

    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            showTree : false,
            inSetup : true,
            _id : '0'
        },
        urlRoot : constants.api.node.url
    });

    function initialize() {
        var self = this;
        Model.prototype.initialize.apply(this, arguments);
        this.set('children', new (grasshopperCollection.extend({
            url : function() {
                return constants.api.nodesChildren.url.replace(':id', self.get('_id'));
            }
        }))());
    }
});