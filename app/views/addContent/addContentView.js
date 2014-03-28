/*global define:false*/
define(['grasshopperBaseView', 'addContentViewConfig', 'resources', 'contentTypeWorker',
    'api', 'constants', 'breadcrumbWorker'],
    function (GrasshopperBaseView, addContentViewConfig, resources, contentTypeWorker,
              Api, constants, breadcrumbWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : addContentViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            saveContent : saveContent,
            returnFields : returnFields
        });

        function beforeRender ($deferred) {
            _handleCreateContent.call(this, $deferred);
        }

        function afterRender() {
            _addListenerForModelChange.call(this);
            this.$el.foundation();
        }

        function saveContent() {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this))
                .fail(_handleFailedSave.bind(this));
        }

        function _handleSuccessfulSave() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.nodeDetail.replace(':id', this.model.get('node._id'))
            );
            this.displayTemporaryAlertBox(
                {
                    msg : resources.contentItem.successfullySaved,
                    status : true
                }
            );
        }

        function _handleFailedSave() {
            this.displayAlertBox(
                {
                    msg : resources.contentItem.failedToSave
                }
            );
        }

        function _handleCreateContent ($deferred) {
            _getNodesContentTypes.call(this, this.model.get('node._id'))
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
            this.displayModal(
                {
                    msg : resources.contentType.noContentTypes
                })
                .always(_rejectDeferredThenNavigateBack.bind(this, $deferred));
        }

        function _handleNodeWithOneContentType($deferred, contentType) {
            this.model.set('type', contentType._id);
            _setNewContentsAuthor.call(this);
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
            this.model.set('type', selectedContentType);
            _setNewContentsAuthor.call(this);
            _getSelectedContentTypeSchema.call(this, $deferred);
        }

        function _setNewContentsAuthor() {
            this.model.set('author', {
                _id : this.app.user.get('_id')
            });
        }

        function _getSelectedContentTypeSchema($deferred) {
            Api.getContentType(this.model.get('type'))
                .done(_handleSuccessfulContentSchemaRetrieval.bind(this, $deferred))
                .fail($deferred.reject);
        }

        function _handleSuccessfulContentSchemaRetrieval($deferred, schema) {
            this.model.set('schema', schema.fields);
            _updateMastheadBreadcrumbs.call(this, $deferred);
        }

        function _handleCanceledContentTypeSelection($deferred) {
            $deferred.reject();
            _navigateBack.call(this);
        }

        function _handleFailedContentTypeRetrieval($deferred) {
            $deferred.reject();
        }

        function _rejectDeferredThenNavigateBack($deferred) {
            $deferred.reject();
            _navigateBack.call(this);
        }

        function _navigateBack (trigger) {
            this.app.router.removeThisRouteFromBreadcrumb();
            this.app.router.navigateBack(trigger);
        }

        function _updateMastheadBreadcrumbs($deferred) {
            breadcrumbWorker.contentBreadcrumb.call(this, $deferred, true);
        }

        function _addListenerForModelChange() {
            var self = this;

            this.model.on('change:fields', function() {
                self.channels.views.trigger('contentFieldsChange', self.model.get('fields'));
                self.model.off('change:fields');
            });
        }

        function returnFields() {
            this.channels.views.trigger('sendFields', this.model.get('fields'));
        }

    });