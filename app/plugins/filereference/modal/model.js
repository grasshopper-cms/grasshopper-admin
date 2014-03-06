define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'masseuse'],
    function (Model, resources, grasshopperCollection, constants, masseuse) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                loading : true,
                inRoot : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0';
                }),
                label : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0' && 'Root';
                }),
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

            this.set('files', new (grasshopperCollection.extend({
                url : function() {
                    return constants.api.assets.url.replace(':id', self.get('_id'));
                }
            }))());

            this.on('change:selectedContent', _getContentDetails.bind(this));
        }

        function _getContentDetails() {
            this.set('selectedContentLabel',
                this.get('content').findWhere({ _id : this.get('selectedContent') }).get('label'));
        }

    });


