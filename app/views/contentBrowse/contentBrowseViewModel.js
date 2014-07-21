define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection',
    'nodeDetailViewModel', 'contentDetailViewModel', 'assetDetailViewModel', 'underscore', 'jquery', 'api'],
    function (Model, resources, constants, GrasshopperCollection,
              nodeDetailViewModel, contentDetailViewModel, assetDetailViewModel, _, $, api) {

    'use strict';

    return Model.extend({
        initialize : initialize,
        throttleQuery : throttleQuery,
        idAttribute : 'nodeId',
        defaults : {
            resources : resources,
            constants : constants
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

        this.set('childContent', new (GrasshopperCollection.extend({
            model : contentDetailViewModel,
            url : function() {
                return constants.api.nodesContent.url.replace(':id', self.get('nodeId'));
            },
            query : throttleQuery.bind(this)
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

    function throttleQuery() {
        var self = this;
        return _.throttle(function() {
            var value = $.trim(self.get('contentSearchValue')),
                queryData = {
                    filters: [
                        {key: ['fields.title'], cmp: '%', value: value}
                    ],
                    nodes: [self.get('nodeId')],
                    options: {}
                };

            api.makeQuery(queryData)
                .done(function(data) {
                    var childContent = self.get('childContent');

                    if (childContent.length !== data.results.length) {
                        console.log(data.results);
                        childContent.set(data.results, {merge: false});
                    }
                });
        }, constants.contentSearchThrottle)();
    }

});