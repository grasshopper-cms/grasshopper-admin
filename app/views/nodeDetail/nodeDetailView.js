/*global define:false*/
define(['grasshopperBaseView', 'resources', 'underscore', 'jquery', 'api', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, _, $, Api, contentTypeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            prepareToDeleteNode : prepareToDeleteNode,
            handleRowClick : handleRowClick,
            prepareToEditNode : prepareToEditNode
        });

        function prepareToDeleteNode () {
            var self = this;

            this.displayModal(
                {
                    msg : resources.node.deletionWarning
                })
                .done(function () {
                    _deleteNode.call(self);
                });
        }

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
        }

        function prepareToEditNode () {
            var self = this;

            this.model.fetch()
                .done(function() {
                    _getNewNodeName.call(self)
                        .done(function (modalData) {
                            _editNode.call(self, modalData.data);
                        });
                });
        }

        function _editNode(newNodeName) {
            var self = this;

            this.model.set('label', newNodeName);
            this.model.save()
                .done(function () {
                    _handleSuccessfulNodeSave.call(self);
                    _getAvailableContentTypes.call(self)
                        .done(function(availableContentTypes) {
                            _askUserWhichContentTypesToAttach.call(self, availableContentTypes)
                                .done(function(modalData) {
                                    _attachContentTypesToNode.call(self, modalData.data)
                                        .done(function () {
                                            _handleSuccessfulContentTypeAddition.call(self);
                                        })
                                        .fail(function (msg) {
                                            _handleFailedContentTypeAddition.call(self, msg);
                                        });
                                });
                        });
                })
                .fail(function () {
                    _handleFailedNodeSave.call(self);
                });
        }

        function _handleFailedContentTypeAddition(msg) {
            this.displayAlertBox(
                {
                    msg : msg
                }
            );
        }

        function _handleSuccessfulContentTypeAddition() {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.contentType.contentTypeAdded,
                    status : true
                }
            );
        }

        function _attachContentTypesToNode(selectedContentTypes) {
            return contentTypeWorker.addContentTypesToFolder(this.model.get('_id'), selectedContentTypes);
        }

        function _handleSuccessfulNodeSave() {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.node.successfullyUpdated,
                    status : true
                }
            );
        }

        function _askUserWhichContentTypesToAttach(availableContentTypes) {
            return this.displayModal(
                {
                    msg : resources.contentType.editContentTypes,
                    type : 'checkbox',
                    data : availableContentTypes
                });
        }

        function _getAvailableContentTypes() {
            return contentTypeWorker.getAvailableContentTypes(this.model.get('allowedTypes'));
        }

        function _handleFailedNodeSave() {
            this.displayAlertBox(
                {
                    msg : resources.node.errorUpdated
                }
            );
        }

        function _getNewNodeName() {
            return this.displayModal(
                {
                    msg : resources.node.editName,
                    type : 'input',
                    data : this.model.get('label')
                });
        }

        function _deleteNode() {
            var self = this;

            this.model.destroy()
                .done(function () {
                    _handleSuccessfulNodeDeletion.call(self);
                })
                .fail(function () {
                    _handleFailedNodeDeletion.call(self);
                });
        }

        function _handleSuccessfulNodeDeletion() {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.node.successfullyDeletedPre + this.model.get('label') +
                        resources.node.successfullyDeletedPost,
                    status : true
                }
            );
            this.remove();
        }

        function _handleFailedNodeDeletion() {
            this.displayAlertBox(
                {
                    msg : resources.node.errorDeleted + this.model.get('label')
                }
            );
        }
    });