define(['grasshopperModel', 'grasshopperCollection', 'constants', 'underscore', 'jquery', 'api'],
    function (Model, Collection, constants, _, $, api) {
        'use strict';

        return Collection.extend({
            model : Model,
            nodeId : '',
            query : query,
            searchQuery : _.throttle(query, constants.contentSearchThrottle),
            doSkip: doSkip,
            setLimit: setLimit,
            totalAmount : ''
        });


        function doSkip(skip, contentSearchValue, isGoToPage) {
            if ( isGoToPage ) {
                this.skip = (skip > 0) ? skip : 0;
            } else {
                this.skip += (this.skip + skip >= 0) ? skip : 0;
            }

            return this.query(contentSearchValue);
        }

        function setLimit(size, contentSearchValue) {
            this.limit = size;
            return this.query(contentSearchValue);
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
                    if (self.models.length !== data.results.length) {
                        self.totalAmount = data.total;
                        self.set(data.results, {merge : false});
                    }

                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
