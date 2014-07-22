define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'paginatedCollection',
    'nodeDetailViewModel', 'contentDetailViewModel', 'assetDetailViewModel', 'underscore', 'jquery', 'api'],
    function (Model, resources, constants, GrasshopperCollection, paginatedCollection,
              nodeDetailViewModel, contentDetailViewModel, assetDetailViewModel, _, $, api) {

    'use strict';

    return Model.extend({
        initialize : initialize,
        idAttribute : 'nodeId',
        defaults : {
            resources : resources,
            constants : constants,
            limit : constants.pagination.defaultLimit,
            skip : constants.pagination.defaultSkip
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

        this.set('childContent', new (paginatedCollection.extend({
            model : contentDetailViewModel,
            url : function() {
                return constants.api.nodesContent.url.replace(':id', self.get('nodeId'));
            },
            query : doQuery.bind(this),
            searchQuery : _.throttle(doQuery, constants.contentSearchThrottle).bind(this)
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

    function doQuery() {
        var self = this,
            $deferred = new $.Deferred(),
            value = $.trim(self.get('contentSearchValue')),
            queryData = {
                filters: [
                    {key: ['fields.title'], cmp: '%', value: value}
                ],
                nodes: [self.get('nodeId')],
                options: {
                    limit: parseInt( (self.get('limit') || constants.pagination.defaultLimit), 10),
                    skip : parseInt( (self.get('skip') || constants.pagination.defaultSkip), 10)
                }
            };

        console.log(queryData);
        api.makeQuery(queryData)
            .done(function(data) {
                var childContent = self.get('childContent');

                if (childContent.length !== data.results.length) {
                    childContent.set(data.results, {merge: false});
                }
                console.log(data);
                $deferred.resolve();
            })
            .fail(function() {
                console.log('FU');
            });

        return $deferred.promise();

    }

});