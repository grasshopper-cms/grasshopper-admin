define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'jquery', 'api'],
    function (Model, resources, GrasshopperCollection, constants, $, Api) {
        'use strict';

        return Model.extend({
            initialize : initialize,
            query : query,
            buildQueryOptions : buildQueryOptions,
            defaults : {
                resources : resources,
                contentTypeCollection : null,
                nodesCollection : null,
                newFilterModel : null,
                filtersCollection : null,
                inTypesCollection : null
            }
        });

        function initialize() {
            Model.prototype.initialize.apply(this, arguments);

            this.set('inTypesCollection', new (GrasshopperCollection.extend({}))());

            this.set('inNodesCollection', new (GrasshopperCollection.extend({
                toJSON : function(something) {
                    console.log(something);
                    return something;
                }
            }))());

            this.set('contentTypeCollection', new (GrasshopperCollection.extend({
                url : constants.api.contentTypes.url
            }))());

            this.set('nodesCollection', new (GrasshopperCollection.extend({
                url : constants.api.nodesChildrenDeep.url.replace(':id', 0)
            }))());

            this.set('newFilterModel', new (Model.extend({}))());

            this.set('filtersCollection', new (GrasshopperCollection.extend({}))());

            this.set('possibleQueryComparators', constants.possibleQueryComparators);
        }

        function query() {
            var $deferred = $.Deferred(),
                options;

            options = this.buildQueryOptions();

            Api.makeQuery(options)
                .done(function(results) {
                    //this.reset(results.results, { parse: true });
                    this.reset(results.results);
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

//var $deferred = $.Deferred(),
//    queryData = {
//        filters : [{key: _.result(this, 'filterKey'), cmp: '%', value: searchValue || ''}],
//        nodes: [ _.result(this, 'nodeId') ] || [],
//        options: {
//            limit: parseInt(_.result(this, 'limit'), 10),
//            skip : (parseInt(_.result(this, 'skip', 10) - 1) * _.result(this, 'limit'))
//        }
//    };
//
//Api.makeQuery(queryData)
//    .done(function(results) {
//        this.reset(results, { parse: true });
//        this.searching = false;
//        $deferred.resolve();
//    }.bind(this));
//
//return $deferred.promise();