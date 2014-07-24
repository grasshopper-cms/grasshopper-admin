define(['grasshopperModel', 'grasshopperCollection', 'constants', 'underscore', 'jquery', 'api'],
    function (Model, Collection, constants, _, $, api) {
        'use strict';

        return Collection.extend({
            model : Model,
            nodeId : '',
            query : query,
            searchQuery : _.throttle(query, constants.contentSearchThrottle),
            next: next,
            setLimit: setLimit,
            totalAmount : ''
        });


        function next( context ) {
            console.log('YEAH BUDDYYYYY');
            this.limit = context.size;
            this.query();
        }

        function setLimit( ev, context ) {
            ev.preventDefault();
            this.limit = context.size;
            this.query(context.model.get('contentSearchValue'));
        }

        function query(value) {
            var self = this,
                $deferred = new $.Deferred(),
                queryData = {
                    filters: [
                        {key: 'virtual.label', cmp: '%', value: value || ''}
                    ],
                    nodes: [self.nodeId],
                    options: {
                        limit: parseInt( self.limit, 10),
                        skip : parseInt( self.skip, 10)
                    }
                };

            api.makeQuery(queryData)
                .done(function(data) {
                    console.log(data);

                    if (self.models.length !== data.results.length) {
                        self.totalAmount = data.total;
                        self.set(data.results, {merge : false});
                    }
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
