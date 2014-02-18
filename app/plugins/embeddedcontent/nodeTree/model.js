define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants'],
    function (Model, resources, grasshopperCollection, constants) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            loading : false
        }
    });

    function initialize() {
        var self = this;
        Model.prototype.initialize.apply(this, arguments);
        this.set('children', new (grasshopperCollection.extend({
            url : function() {
                return constants.api.nodes.url.replace(':id', self.get('_id'));
            }
        }))());
    }

});