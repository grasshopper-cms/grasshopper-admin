define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'masseuse', 'underscore',
        'itemSelectModal/contentModel', 'assetDetailViewModel'],
    function (Model, resources, grasshopperCollection, constants, masseuse, _,
              contentModel, assetDetailViewModel) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            initialize : initialize,
            idAttribute : '_id',
            defaults : {
                header : 'Select Item',
                nodeId : new ComputedProperty(['_id'], function(_id) {
                    return _id; // This is here for the contentBrowse breadcrumb.
                }),
                breadcrumbs : [],
                inRoot : new ComputedProperty(['_id'], function(_id) {
                    return _id === '0';
                }),
                resources : resources
            },
            urlRoot : constants.api.node.url
        });

        function initialize() {
            var self = this;

            Model.prototype.initialize.apply(this, arguments);

            this.set('childNodes', new (grasshopperCollection.extend({
                url : function() {
                    return constants.api.nodesChildren.url.replace(':id', self.get('_id'));
                }
            }))());

            this.set('content', new (grasshopperCollection.extend({
                model : contentModel,
                url : function() {
                    return constants.api.nodesContent.url.replace(':id', self.get('_id'));
                }
            }))());

            this.set('assets', new (grasshopperCollection.extend({
                model : assetDetailViewModel,
                url : function() {
                    return constants.api.assets.url.replace(':id', self.get('_id'));
                }
            }))());

        }

    });