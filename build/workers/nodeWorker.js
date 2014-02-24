define(['api', 'jquery'],
    function (Api, $) {
        'use strict';

        return {
            getNodeForTree : getNodeForTree
        };

        function getNodeForTree(nodeId) {
            var $deferred = new $.Deferred();

            Api.getNodesChildren(nodeId)
                .done($deferred.resolve)
                .fail($deferred.reject);

            return $deferred.promise();
        }

    });