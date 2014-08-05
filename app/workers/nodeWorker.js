define(['api', 'jquery', 'resources', 'contentTypeWorker', 'underscore', 'constants'],
    function (Api, $, resources, contentTypeWorker, _, constants) {
        'use strict';

        return {
            getNodeForTree : getNodeForTree,
            editName : editName,
            editContentTypes : editContentTypes,
            deleteNode : deleteNode,
            deleteUser : deleteUser
        };

        function getNodeForTree(nodeId) {
            var $deferred = new $.Deferred();

            Api.getNodesChildren(nodeId)
                .done($deferred.resolve)
                .fail($deferred.reject);

            return $deferred.promise();
        }

        function editName() {
            var self = this,
                $deferred = new $.Deferred();

            $.when(_askUserForNewNodeName.call(this), this.model.fetch())
                .then(function(modalData) {
                    self.model.set('label', modalData.data);
                    _saveThisNode.call(self)
                        .done($deferred.resolve);
                });

            return $deferred.promise();
        }

        function editContentTypes() {
            _getAvailableContentTypes.call(this)
                .then(_askUserWhichContentTypesToAttach.bind(this))
                .then(_attachContentTypesToNode.bind(this));
        }

        function deleteNode() {
            _warnUserBeforeDeleting.call(this, resources.node.deletionWarning)
                .done(_actuallyDeleteNode.bind(this, true));
        }

        function deleteUser() {
            _warnUserBeforeDeleting.call(this, resources.node.userDeletionWarning)
                .done(_actuallyDeleteNode.bind(this, false));
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function _askUserForNewNodeName() {
            return this.displayModal(
                {
                    header : resources.node.editName,
                    type : 'input',
                    data : this.model.get('label')
                });
        }

        function _saveThisNode() {
            var $deferred = new $.Deferred();

            this.model.save()
                .done(_handleSuccessfulNodeSave.bind(this, $deferred))
                .fail(_handleFailedNodeSave.bind(this, $deferred));

            return $deferred.promise();
        }

        function _handleSuccessfulNodeSave($deferred) {
            this.displayTemporaryAlertBox(
                {
                    header : resources.success,
                    style : 'success',
                    msg : resources.node.successfullyUpdated
                }
            );
            $deferred.resolve();
        }

        function _handleFailedNodeSave($deferred) {
            this.fireErrorModal(resources.node.errorUpdated);
            $deferred.reject();
        }

        function _getAvailableContentTypes() {
            return contentTypeWorker.getAvailableContentTypes(this.model.get('allowedTypes'));
        }

        function _askUserWhichContentTypesToAttach(availableContentTypes) {
            return this.displayModal(
                {
                    header : resources.contentType.editContentTypes,
                    type : 'checkbox',
                    data : availableContentTypes
                });
        }

        function _attachContentTypesToNode(modalData) {
            var selectedContentTypes = _.where(modalData.data, {checked: true}),
                contentTypeToPost = _.map(selectedContentTypes, function(type) {
                    return _.pick(type, 'label', 'helpText', '_id');
                });

            this.model.set('allowedTypes', contentTypeToPost);

            this.model.save()
                .done(_handleSuccessfulContentTypeAddition.bind(this))
                .fail(_handleFailedContentTypeAddition.bind(this));
        }

        function _handleSuccessfulContentTypeAddition() {
            this.displayTemporaryAlertBox(
                {
                    header : resources.success,
                    style : 'success',
                    msg : resources.contentType.contentTypeAdded
                }
            );
        }

        function _handleFailedContentTypeAddition(msg) {
            this.fireErrorModal(msg);
        }

        function _warnUserBeforeDeleting(message) {
            return this.displayModal(
                {
                    header : resources.warning,
                    msg : message
                });
        }

        function _actuallyDeleteNode(goToParent) {
            var self = this;
            this.model.fetch()
                .then(function() {
                    self.model.destroy()
                        .done(_handleSuccessfulNodeDeletion.bind(self,goToParent))
                        .fail(_handleFailedNodeDeletion.bind(self));
                });
        }

        function _handleSuccessfulNodeDeletion(goToParent) {
            var message;
            if (goToParent !== false) {
                _redirectToParent.call(this);
            }
            if (this.model.get('label')) {
                message = resources.node.successfullyDeletedPre + this.model.get('label') + resources.node.successfullyDeletedPost;
            }
            else {
                message = resources.node.successfullyDeletedWithoutLabel;
            }
            this.displayTemporaryAlertBox(
                {
                    header: resources.success,
                    style: 'success',
                    msg: message
                }
            );
        }

        function _handleFailedNodeDeletion() {
            this.fireErrorModal(resources.node.errorDeleted + this.model.get('label'));
        }

        function _redirectToParent() {
            var parent = this.model.get('parent');

            if(parent && parent._id) {
                this.app.router.navigateTrigger(constants.internalRoutes.nodeDetail.replace(':id', parent._id));
            } else {
                this.app.router.navigateTrigger(constants.internalRoutes.content);
            }

        }

    });