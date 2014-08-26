define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'jquery', 'api', 'underscore', 'contentDetailViewModel'],
    function (Model, resources, GrasshopperCollection, constants, $, Api, _, contentDetailViewModel) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            query : query,
            buildQueryOptions : buildQueryOptions,
            defaults : {
                resources : resources,
                loadingResults : false,
                inTypesCollection : null,
                inNodesCollection : null,
                contentTypeCollection : null,
                nodesCollection : null,
                newFilterModel : null,
                filtersCollection : null,
                resultsCollection : null,
                possibleQueryComparators : null
            }
        });

        function initialize() {
            Model.prototype.initialize.apply(this, arguments);

            this.set('inTypesCollection', new (GrasshopperCollection.extend({
                toJSON : function() {
                    var json = GrasshopperCollection.prototype.toJSON.apply(this);
                    return _.pluck(json, '_id');
                }
            }))());

            this.set('inNodesCollection', new (GrasshopperCollection.extend({
                toJSON : function() {
                    var json = GrasshopperCollection.prototype.toJSON.apply(this);
                    return _.pluck(json, '_id');
                }
            }))());

            this.set('contentTypeCollection', new (GrasshopperCollection.extend({
                url : constants.api.contentTypes.url
            }))());

            this.set('nodesCollection', new (GrasshopperCollection.extend({
                url : constants.api.nodesChildrenDeep.url.replace(':id', 0)
            }))());

            this.set('newFilterModel', new (Model.extend({
                defaults : function() {
                    return {
                        cmp : '',
                        key : '',
                        value : ''
                    };
                }
            }))());

            this.set('filtersCollection', new (GrasshopperCollection.extend({}))());

            this.set('resultsCollection', new (GrasshopperCollection.extend({
                model : contentDetailViewModel
            }))());

            this.set('possibleQueryComparators', constants.possibleQueryComparators);
        }

        function query() {
            var $deferred = $.Deferred(),
                options;

            options = this.buildQueryOptions();

            this.toggle('loadingResults');

            Api.makeQuery(options)
                .done(function(results) {
                    this.get('resultsCollection').reset(results.results, { parse : true });
                    this.toggle('loadingResults');
                    $deferred.resolve();
                }.bind(this))
                .fail($deferred.reject);

            return $deferred.promise();
        }

        function buildQueryOptions() {
            var options = {};

            options.filters = this.get('filtersCollection').toJSON();

            options.nodes = this.get('inNodesCollection').toJSON();

            options.types = this.get('inTypesCollection').toJSON();

            options.options = {
                limit : 1000,
                skip : 0
            };

            return options;
        }

    });