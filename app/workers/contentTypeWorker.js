/*global define:false*/
define(['api', 'jquery', 'resources', 'underscore'],
    function (Api, $, resources, _) {
        'use strict';

        return {
            getAvailableContentTypes : getAvailableContentTypes,
            addContentTypesToFolder : addContentTypesToFolder,
            getNodesContentTypes : getNodesContentTypes
        };

        function getAvailableContentTypes(previousContentTypes) {
            var $deferred = $.Deferred();
            Api.getContentTypes()
                .done(function(data) {
                    if(previousContentTypes) {
                        _.each(data.results, function(result) {
                            if(_.contains(previousContentTypes, result._id)) {
                                result.checked = true;
                            }
                        });
                    }
                    $deferred.resolve(data.results);
                });
            return $deferred.promise();
        }

        function addContentTypesToFolder(nodeId, data) {
            var contentTypes = [],
                $deferred = new $.Deferred();

            _.each(data, function(contentType) {
                if(contentType.checked) {
                    contentTypes.push(contentType._id);
                }
            });

            Api.addContentTypesToNode(nodeId, contentTypes)
                .done(function() {
                    $deferred.resolve();
                })
                .fail(function(xhr) {
                    $deferred.reject(xhr.responseJSON.message);
                });

            return $deferred.promise();
        }

        function getNodesContentTypes(nodeId) {
            var $deferred = new $.Deferred();

            Api.getNodeDetail(nodeId)
                .done(function(data) {
                    $deferred.resolve(data);
                })
                .fail(function(data) {
                    $deferred.reject(data);
                });

            return $deferred.promise();
        }

    });