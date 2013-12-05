/*global define:false*/
define(['api', 'jquery'],
    function (Api, $) {
        'use strict';

        return {
            createFolder : createFolder
        };

        function createFolder(nodeId, folderName) {
            var $deferred = new $.Deferred(),
                data = {
                    label : folderName,
                    parent : nodeId
                };

            Api.postFolder(data)
                .done(function() {
                    $deferred.resolve();
                })
                .fail(function() {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

    });