define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'underscore'],
    function (Model, resources, GrasshopperCollection, constants, _) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            preparePossibleContentFields : preparePossibleContentFields,
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

        function preparePossibleContentFields() {
            var possibleFields = [];

            this.get('contentTypeCollection').each(function(contentType){
                _.each(contentType.get('fields'), function(field) {
                    possibleFields.push({
                        label : field.label,
                        _id : field._id
                    });
                });
            });

            this.set('possibleFields', possibleFields);
        }

        function preparePossibleFieldComparators() {
            this.set('possibleQueryComparators', constants.possibleQueryComparators);
        }
    });