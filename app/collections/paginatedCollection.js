define(['grasshopperModel', 'grasshopperCollection', 'constants', 'underscore', 'jquery', 'api'],
    function (Model, Collection, constants, _, $, api) {
        'use strict';

        return Collection.extend({
            model : Model,
            nodeId : '',
            next: next,
            setLimit: setLimit,
            query : query,
            searchQuery : _.throttle(query, constants.contentSearchThrottle),
            limit : constants.pagination.defaultLimit,
            skip : constants.pagination.defaultSkip
        });


        function next( context ) {
            this.limit = context.size;
            this.query();
        }

        function setLimit( ev, context ) {
            ev.preventDefault();
            console.log('PER PAGE');
            this.limit = context.size;
            this.query(context.model.get('contentSearchValue'));
        }

        function query(value) {
            console.log(this);
            var self = this,
                $deferred = new $.Deferred(),
                queryData = {
                    filters: [
                        {key: ['fields.title'], cmp: '%', value: value || ''}
                    ],
                    nodes: [self.nodeId],
                    options: {
                        limit: parseInt( (self.limit || constants.pagination.defaultLimit), 10),
                        skip : parseInt( (self.skip || constants.pagination.defaultSkip), 10)
                    }
                };

            console.log(queryData);
            api.makeQuery(queryData)
                .done(function(data) {

                    if (self.models.length !== data.results.length) {
                        self.set(data.results, {merge : false});
                    }
                    console.log(data);
                    $deferred.resolve();
                })
                .fail(function(err) {
                    console.log('FAIL OF FAIL OF FAIL FAILED');
                    console.log(err);
                });

            return $deferred.promise();
        }

    });
