define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'underscore'],
    function (Model, resources, constants, grasshopperCollection, _) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        toJson : toJSON,
        idAttribute : 'nodeId',
        defaults : {
            resources : resources
        },
        urlRoot : constants.api.node.url
    });

    function initialize() {
        var self = this;

        Model.prototype.initialize.apply(this, arguments);

        this.set('childNodes', new (grasshopperCollection.extend({
            url : function() {
                return constants.api.nodesChildren.url.replace(':id', self.get('nodeId'));
            }
        }))());
    }

    function toJSON() {
        return _.omit(this.attributes, 'childNodes', 'nodeId', 'resources');
    }
});