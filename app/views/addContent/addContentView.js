/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            // TODO: This node ID check is done in a bunch of different Views. Move this somewhere else to DRY this up.
            if (this.model.get('nodeId') !== '0') {
                _handleCreateContent.call(this, $deferred);
            } else {
                _createContentInRoot.call(this, $deferred);
            }
        }

        function _handleCreateContent ($deferred) {
            var self = this;
            _getNodesContentTypes.call(self, self.model.get('nodeId'))
                .done(function (nodeData) {
                    console.log(nodeData);
                    if(nodeData.allowedTypes) {
                        switch (nodeData.allowedTypes.length) {
                        case (0) :
                            _handleNodeWithZeroContentTypes.call(self, $deferred);
                            break;
                        case (1) :
                            _handleNodeWithOneContentType.call(self, $deferred, nodeData.allowedTypes[0]);
                            break;
                        default :
                            _getSelectedContentTypeFromUser.call(self, nodeData.allowedTypes)
                                .done(function (modalData) {
                                    _handleSuccessfulContentTypeSelection.call(self, $deferred, modalData.selectedType);
                                })
                                .fail(function () {
                                    _handleCanceledContentTypeSelection.call(self, $deferred);
                                });
                            break;
                        }
                    }
                })
                .fail(function (xhr) {
                    _handleFailedContentTypeRetrieval.call(self, $deferred, xhr);
                });
        }

        function _getNodesContentTypes(nodeId) {
            return contentTypeWorker.getNodesContentTypes(nodeId);
        }

        function _handleNodeWithZeroContentTypes($deferred) {
            var self = this;
            this.displayModal(
                {
                    msg : resources.contentType.noContentTypes
                })
                .always(function () {
                    $deferred.reject();
                    _navigateBack.call(self);
                });
        }

        function _handleNodeWithOneContentType($deferred, contentType) {
            this.model.set('contentTypeId', contentType._id);
            $deferred.resolve();
        }

        function _getSelectedContentTypeFromUser(nodeData) {
            return this.displayModal(
                {
                    msg : resources.contentType.selectContentType,
                    data : nodeData,
                    type : 'radio'
                });
        }

        function _handleSuccessfulContentTypeSelection($deferred, selectedContentType) {
            this.model.set('contentTypeId', selectedContentType);
            $deferred.resolve();
        }

        function _handleCanceledContentTypeSelection($deferred) {
            $deferred.reject();
            _navigateBack.call(this);
        }

        function _handleFailedContentTypeRetrieval($deferred, xhr) {
            $deferred.reject();
            console.log(xhr);
        }

        function _createContentInRoot ($deferred) {
            var self = this;
            this.displayModal(
                {
                    msg : resources.contentType.contentInRoot
                })
                .always(function () {
                    $deferred.reject();
                    _navigateBack.call(self);
                });
        }

        function _navigateBack (trigger) {
            this.app.router.navigateBack(trigger);
            this.app.router.removeThisRouteFromBreadcrumb();
        }

    });