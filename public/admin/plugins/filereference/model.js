define(['grasshopperModel', 'resources', 'backbone', 'constants', 'grasshopperCollection', 'masseuse', 'underscore', 'assetDetailViewModel'],
    function (Model, resources, Backbone, constants, grasshopperCollection, masseuse, _, assetDetailViewModel) {

    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            showTree : false,
            inSetup : true,
            nodeTreeType : 'file',
            selectedContentName : new ComputedProperty(['selectedContent'], function(selectedContent) {
                return (selectedContent) ? _.last(selectedContent.split('/')) : '';
            }),
            selectedContent : new ComputedProperty(['value'], function(value) {
                return value;
            }),
            assetModel : new ComputedProperty(['value'], function(value){
                return new assetDetailViewModel({
                    nodeId : _.first(value.split('/')),
                    url : value
                });
            }),
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