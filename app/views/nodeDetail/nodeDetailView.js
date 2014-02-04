/*global define:false*/
define(['grasshopperBaseView', 'nodeDetailViewConfig', 'resources', 'underscore', 'jquery', 'api', 'contentTypeWorker'],
    function (GrasshopperBaseView, nodeDetailViewConfig, resources, _, $, Api, contentTypeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : nodeDetailViewConfig,
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
            this.displayModal(
                {
                    msg : resources.node.deletionWarning
                })
                .then(_deleteNode.bind(this));
        }

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
            return false;
        }

        function prepareToEditNode () {
            var self = this;

            $.when(_askUserForNewNodeName.call(this), this.model.fetch())
                .then(function(modalData) {
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
            $
                .when(_getAvailableContentTypes.call(this), _saveThisNode.call(this))
                .then(_askUserWhichContentTypesToAttach.bind(this))
                .then(_attachContentTypesToNode.bind(this));
        }

        function _saveThisNode() {
            var $deferred = new $.Deferred();

            this.model.save()
                .done(_handleSuccessfulNodeSave.bind(this, $deferred))
                .fail(_handleFailedNodeSave.bind(this, $deferred));

            return $deferred.promise();
        }

        function _attachContentTypesToNode(modalData) {
            var selectedContentTypes = modalData.data;

            contentTypeWorker.addContentTypesToFolder(this.model.get('_id'), selectedContentTypes)
                .done(_handleSuccessfulContentTypeAddition.bind(this))
                .fail(_handleFailedContentTypeAddition.bind(this));
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

        function _handleFailedNodeSave($deferred) {
            this.displayAlertBox(
                {
                    msg : resources.node.errorUpdated
                }
            );
            $deferred.reject();
        }

        function _handleSuccessfulNodeSave($deferred) {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.node.successfullyUpdated,
                    status : true
                }
            );
            $deferred.resolve();
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
            this.model.destroy()
                .done(_handleSuccessfulNodeDeletion.bind(this))
                .fail(_handleFailedNodeDeletion.bind(this));
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