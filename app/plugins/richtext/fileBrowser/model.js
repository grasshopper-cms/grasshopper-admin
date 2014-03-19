define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection'],
    function (Model, resources, constants, grasshopperCollection) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            defaults : {
                resources : resources,
                showTree : false,
                nodeTreeType : 'file',
                header : resources.plugins.richText.selectFile
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