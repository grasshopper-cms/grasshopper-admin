/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker', 'nodeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker, nodeWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender () {
            getFolderName.call(this);
        }

        function getFolderName () {
            var self = this;
            this.displayModal(
                {
                    msg : resources.node.enterName,
                    type : 'input'
                })
                .done(function (modalData) {
                    self.channels.views.trigger('activateTab', 'contentTab');
                    _createFolder.call(self, modalData.data)
                        .done(function (newFolderModel) {
                            _handleSuccessfulFolderCreation.call(self, newFolderModel);
                            _prepareToAddContentTypesToFolder.call(self, newFolderModel);
                        })
                        .fail(function () {
                            _handleFailedFolderCreation.call(self);
                        });
                })
                .fail(function () {
                    _navigateBack.call(self);
                });
        }

        function _handleSuccessfulFolderCreation(newFolderModel) {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.node.successfullyCreatedPre +
                        newFolderModel.label +
                        resources.node.successfullyCreatedPost,
                    status : true
                }
            );
            this.channels.views.trigger('refreshContentBrowseView');
        }

        function _handleFailedFolderCreation() {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.node.errorCreating
                }
            );
        }

        function _prepareToAddContentTypesToFolder(newFolderModel) {
            var self = this;

            _getAvailableContentTypes.call(this)
                .done(function (availableContentTypes) {
                    _askUserWhatContentTypesToAttach.call(self, availableContentTypes)
                        .done(function (modalData) {
                            _actuallyAddContentTypesToFolder.call(self, modalData.data, newFolderModel._id)
                                .done(function () {
                                    _handleSuccessfulContentTypeAdd.call(self);
                                })
                                .fail(function (msg) {
                                    _handleFailedContentTypeAdd.call(self, msg);
                                });
                        })
                        .always(function () {
                            _navigateBack.call(self);
                        });
                });
        }

        function _handleSuccessfulContentTypeAdd() {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.contentType.contentTypeAdded,
                    status : true
                }
            );
            this.channels.views.trigger('refreshContentBrowseView');
        }

        function _handleFailedContentTypeAdd(msg) {
            this.displayTemporaryAlertBox(
                {
                    msg : msg
                }
            );
        }

        function _actuallyAddContentTypesToFolder(selectedContentTypes, newFolderId) {
            return contentTypeWorker.addContentTypesToFolder(newFolderId, selectedContentTypes);
        }

        function _askUserWhatContentTypesToAttach(availableContentTypes) {
            return this.displayModal(
                {
                    msg : resources.contentType.addContentTypes,
                    type : 'checkbox',
                    data : availableContentTypes
                });
        }

        function _getAvailableContentTypes() {
            return contentTypeWorker.getAvailableContentTypes();
        }

        function _createFolder (folderName) {
            return nodeWorker.createFolder(this.model.get('nodeId'), folderName);
        }

        function _navigateBack (trigger) {
            this.app.router.navigateBack(trigger);
            this.app.router.removeThisRouteFromBreadcrumb();
            this.remove();
        }

    });