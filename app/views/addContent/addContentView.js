/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker', 'api'],
    function (GrasshopperBaseView, resources, contentTypeWorker, Api) {
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
            _getNodesContentTypes.call(this, this.model.get('nodeId'))
                .done(_decideHowToHandleContentTypeSelection.bind(this, $deferred))
                .fail(_handleFailedContentTypeRetrieval.bind(this, $deferred));
        }

        function _getNodesContentTypes(nodeId) {
            return contentTypeWorker.getNodesContentTypes(nodeId);
        }

        function _decideHowToHandleContentTypeSelection($deferred, nodeData) {
            var self = this,
                allowedTypes = nodeData.allowedTypes;

            if(allowedTypes) {
                switch (allowedTypes.length) {
                case (0) :
                    _handleNodeWithZeroContentTypes.call(self, $deferred);
                    break;
                case (1) :
                    _handleNodeWithOneContentType.call(self, $deferred, allowedTypes[0]);
                    break;
                default :
                    _getSelectedContentTypeFromUser.call(self, allowedTypes)
                        .done(function (modalData) {
                            _handleSuccessfulContentTypeSelection.call(self, $deferred, modalData.selectedType);
                        })
                        .fail(function () {
                            _handleCanceledContentTypeSelection.call(self, $deferred);
                        });
                    break;
                }
            } else {
                _handleNodeWithZeroContentTypes.call(self, $deferred);
            }
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
            _getSelectedContentTypeSchema.call(this, $deferred);
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
            _getSelectedContentTypeSchema.call(this, $deferred);
        }

        function _getSelectedContentTypeSchema($deferred) {
            var self = this;

            Api.getContentType(this.model.get('contentTypeId'))
                .done(function(data) {
                    self.model.set('schema', data.fields);
                    $deferred.resolve();
                })
                .fail(function() {
                    $deferred.reject();
                });

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