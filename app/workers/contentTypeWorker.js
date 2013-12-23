/*global define:false*/
define(['api', 'jquery', 'resources', 'underscore'],
    function (Api, $, resources, _) {
        'use strict';

        return {
            getAvailableContentTypes : getAvailableContentTypes,
            addContentTypesToFolder : addContentTypesToFolder,
            getNodesContentTypes : getNodesContentTypes
        };

        function getAvailableContentTypes (previousContentTypes) {
            var $deferred = $.Deferred();
            Api.getContentTypes()
                .done(function (data) {
                    if (previousContentTypes) {
                        _.each(data.results, function (result) {
                            if (_.contains(previousContentTypes, result._id)) {
                                result.checked = true;
                            }
                        });
                    }
                    $deferred.resolve(data.results);
                });
            return $deferred.promise();
        }

        function addContentTypesToFolder (nodeId, data) {
            var $deferred = new $.Deferred(),
                contentTypeToPost = {},
                requests = [],
                contentTypes = _.where(data, {checked: true});

//            TODO: This is a HACK. There is a better endpoint to hit where I can post multiple contentypes at once.
//            Though, It does not work and I could not afford to spend more time debugging. needs to be revisited.

            _.each(contentTypes, function(contentType) {
                contentTypeToPost.id = contentType._id;
                requests.push(Api.addContentTypesToNode(nodeId, contentTypeToPost));
            });

            $.when.apply($, requests)
                .done(function() {
                    $deferred.resolve();
                })
                .fail(function() {
                    $deferred.reject('Content Types could not be added.');
                });

            return $deferred.promise();
        }

        function getNodesContentTypes (nodeId) {
            var $deferred = new $.Deferred();

            Api.getNodeDetail(nodeId)
                .done(function (data) {
                    $deferred.resolve(data);
                })
                .fail(function (data) {
                    $deferred.reject(data);
                });

            return $deferred.promise();
        }

    });