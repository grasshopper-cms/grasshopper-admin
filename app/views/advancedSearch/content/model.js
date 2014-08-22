define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants'],
    function (Model, resources, GrasshopperCollection, constants) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            preparePossibleFieldComparators : preparePossibleFieldComparators,
            defaults : {
                resources : resources,
                inTypes : []
            }
        });

        function initialize() {
            Model.prototype.initialize.apply(this, arguments);

            this.set('contentTypeCollection', new (GrasshopperCollection.extend({
                url : constants.api.contentTypes.url
            }))());

            this.set('nodesCollection', new (GrasshopperCollection.extend({
                url : constants.api.nodesChildrenDeep.url.replace(':id', 0)
            }))());
        }

        function preparePossibleFieldComparators() {
            this.set('possibleQueryComparators', constants.possibleQueryComparators);
        }
    });