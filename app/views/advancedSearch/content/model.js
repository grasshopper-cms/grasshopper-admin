define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants'],
    function (Model, resources, GrasshopperCollection, constants) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            query : query,
            defaults : {
                resources : resources,
                contentTypeCollection : null,
                nodesCollection : null,
                newFilterModel : null,
                filtersCollection : null,
                inTypesCollection : null
            }
        });

        function initialize() {
            Model.prototype.initialize.apply(this, arguments);

            this.set('inTypesCollection', new (GrasshopperCollection.extend({}))());

            this.set('inNodesCollection', new (GrasshopperCollection.extend({}))());

            this.set('contentTypeCollection', new (GrasshopperCollection.extend({
                url : constants.api.contentTypes.url
            }))());

            this.set('nodesCollection', new (GrasshopperCollection.extend({
                url : constants.api.nodesChildrenDeep.url.replace(':id', 0)
            }))());

            this.set('newFilterModel', new (Model.extend({}))());

            this.set('filtersCollection', new (GrasshopperCollection.extend({}))());

            this.set('possibleQueryComparators', constants.possibleQueryComparators);
        }

        function query() {

        }

    });