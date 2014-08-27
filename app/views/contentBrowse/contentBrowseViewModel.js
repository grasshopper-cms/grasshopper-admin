define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'paginatedCollection',
    'nodeDetailViewModel', 'contentDetailViewModel', 'assetDetailViewModel', 'underscore', 'api'],
    function (Model, resources, constants, GrasshopperCollection, PaginatedCollection,
              nodeDetailViewModel, contentDetailViewModel, assetDetailViewModel, _, api) {

    'use strict';

    return Model.extend({
        initialize : initialize,
        idAttribute : 'nodeId',
        defaults : {
            resources : resources,
            constants : constants,
            childNodes : null,
            childContent : null,
            childAssets : null
        },
        urlRoot : constants.api.node.url
    });

    function initialize() {
        var self = this;

        this.set('childNodes', new (GrasshopperCollection.extend({
            model : nodeDetailViewModel,
            url : function() {
                return constants.api.nodesChildren.url.replace(':id', self.get('nodeId'));
            }
        }))());

        this.set('childContent', new (PaginatedCollection.extend({
            model : contentDetailViewModel,
            url : function() {
                return constants.api.nodesContent.url.replace(':id', self.get('nodeId'));
            },
            limit : parseInt( this.get('limit') || constants.pagination.defaultLimit, 10 ),
            skip : parseInt( this.get('skip') || constants.pagination.defaultSkip, 10 ),
            nodeId : this.get('nodeId'),
            filtersKey : 'virtual.label',
            queryRequest : api.makeQuery
        }))());

        this.set('childAssets', new (GrasshopperCollection.extend({
            model : function(attrs, options) {
                return new assetDetailViewModel(_.extend(attrs, { nodeId : self.get('nodeId') }), options);
            },
            url : function() {
                return constants.api.assets.url.replace(':id', self.get('nodeId'));
            }
        }))());
    }

});
