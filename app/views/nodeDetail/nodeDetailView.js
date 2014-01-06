/*global define:false*/
define(['grasshopperBaseView', 'resources', 'underscore', 'jquery', 'api', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, _, $, Api, contentTypeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            prepareToDeleteNode : prepareToDeleteNode,
            handleRowClick : handleRowClick,
            prepareToEditNode : prepareToEditNode
        });

        function beforeRender() {
            if(this.model.isNew()) {
                _saveNodeWorkflow.call(this);
            }
        }

        function prepareToDeleteNode () {
            var self = this;

            this.displayModal(
                {
                    msg : resources.node.deletionWarning
                })
                .then(function () {
                    _deleteNode.call(self);
                });
        }

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
            return false;
        }

        function prepareToEditNode () {
            var self = this;

            $.when(this.model.fetch(), _askUserForNewNodeName.call(this))
                .then(function(model, modalData) {
                    self.model.set('label', modalData.data);
                    _saveNodeWorkflow.call(self);
                });
        }

        function _askUserForNewNodeName() {
            return this.displayModal(
                {
                    msg : resources.node.editName,
                    type : 'input',
                    data : this.model.get('label')
                });
        }

        function _saveNodeWorkflow() {
            var self = this;

//            $
//                .when(_getAvailableContentTypes.call(this), _saveThisNode.call(this))
//                .then(_askUserWhichContentTypesToAttach.bind(this, availableContentTypes))
//                .then(_attachContentTypesToNode.bind(this, modalData));

            $.when(_saveThisNode.call(this), _getAvailableContentTypes.call(this))
                .then(function(model, availableContentTypes) {
                    _askUserWhichContentTypesToAttach.call(self, availableContentTypes)
                        .then(function(modalData) {
                            _attachContentTypesToNode.call(self, modalData.data);
                        });
                });
        }

        function _saveThisNode() {
            var self = this,
                $deferred = new $.Deferred();

            this.model.save()
                .done(function() {
                    _handleSuccessfulNodeSave.call(self);
                    $deferred.resolve();
                })
                .fail(function() {
                    _handleFailedNodeSave.call(self);
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function _attachContentTypesToNode(selectedContentTypes) {
            var self = this;

            contentTypeWorker.addContentTypesToFolder(this.model.get('_id'), selectedContentTypes)
                .done(function () {
                    _handleSuccessfulContentTypeAddition.call(self);
                })
                .fail(function (msg) {
                    _handleFailedContentTypeAddition.call(self, msg);
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

        function _handleFailedNodeSave() {
            this.displayAlertBox(
                {
                    msg : resources.node.errorUpdated
                }
            );
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