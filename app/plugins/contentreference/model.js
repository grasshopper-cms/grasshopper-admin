define(['grasshopperModel', 'resources', 'backbone', 'constants', 'grasshopperCollection', 'masseuse'],
    function (Model, resources, Backbone, constants, grasshopperCollection, masseuse) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            showTree : false,
            selectedContentHref : new ComputedProperty(['value'], function(contentId) {
                return constants.internalRoutes.contentDetail.replace(':id', contentId);
            }),
            selectedContentLabel : new ComputedProperty(['contentDetails'], function(contentDetails) {
                return this.get('fields.' + contentDetails.meta.fieldlabel);
            }, true),
            _id : '0'
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

        this.on('change:options', function() {
            if (this.get('options.defaultNode') !== '0') {
                this.set('selectedNodeLabel',
                    this.get('children').findWhere( { _id : this.get('options.defaultNode') }).get('label'));
            }
        });
    }
});