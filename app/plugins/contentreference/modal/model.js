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
                folderLabel : new ComputedProperty(['_id', 'label'], function(_id, label) {
                    return _id === '0' ? 'Root' : label;
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

            this.set('content', new (grasshopperCollection.extend({
                url : function() {
                    return constants.api.nodesContent.url.replace(':id', self.get('_id'));
                }
            }))());

            this.on('change:selectedContent', _getContentDetails.bind(this));
        }

        function _getContentDetails() {
            this.set('selectedContentLabel',
                this.get('content').findWhere({ _id : this.get('selectedContent') }).get('label'));
        }

    });


