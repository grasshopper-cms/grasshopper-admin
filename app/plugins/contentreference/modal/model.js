define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants'],
    function (Model, resources, grasshopperCollection, constants) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            defaults : {
                resources : resources
            }
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


