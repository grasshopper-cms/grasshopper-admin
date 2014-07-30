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
            total : 0
        });


        function doSkip(skip, contentSearchValue, pageLength, isGoToPage) {
            pageLength = parseInt(pageLength, 10) || 0;
            isGoToPage = isGoToPage || false;

            if ( isGoToPage ) {
                this.skip = (skip >= 0 && skip <= pageLength) ? skip : 1;
            } else {
                this.skip += ( (this.skip + skip >= 1) && (this.skip + skip <= pageLength) ) ? skip : 0;
            }

            return this.query(contentSearchValue);
        }

        function setLimit(size, contentSearchValue) {
            this.limit = size;
            return this.query(contentSearchValue);
        }

        function query(value) {
            var $deferred = new $.Deferred(),
                queryData = {
                    filters: [
                        {key: 'virtual.label', cmp: '%', value: value || ''}
                    ],
                    nodes: [this.nodeId],
                    options: {
                        limit: parseInt(this.limit, 10),
                        skip : parseInt(this.skip, 10) - 1
                    }
                };
            $('#panel2-1').addClass('spinner-loading');
            api.makeQuery(queryData)
                .done(function(data) {
                    this.set(data.results);
                    this.total = data.total;
                    $deferred.resolve();
                    $('#panel2-1').removeClass('spinner-loading');
                }.bind(this));

            return $deferred.promise();
        }

    });
