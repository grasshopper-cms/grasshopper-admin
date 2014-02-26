define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants'],
    function (Model, resources, grasshopperCollection, constants) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                resources : resources
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

            this.set('content', new (grasshopperCollection.extend({
                url : function() {
                    return constants.api.nodesContent.url.replace(':id', self.get('_id'));
                }
            }))());
        }

    });


