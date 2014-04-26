define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'nodeDetailViewModel'],
    function (Model, resources, constants, GrasshopperCollection, nodeDetailViewModel) {
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
    }

});