/*global define:false*/
define(['grasshopperBaseView', 'resources', 'api', 'assetWorker', 'jquery'],
    function (GrasshopperBaseView, resources, Api, AssetWorker, $) {
        'use strict';
        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            handleRowClick : handleRowClick,
            prepareToDeleteAsset : prepareToDeleteAsset,
            editAsset : editAsset,
            postNewAsset : postNewAsset,
            cancelUpload : cancelUpload
        });

        function afterRender () {
            if (this.model.has('fileData')) {
                this.postNewAsset();
            }
        }

        function handleRowClick (e) {
            e.stopPropagation();
            this.displayModal(
                {
                    msg : this.model.get('fileName'),
                    type : 'image',
                    data : this.model.get('url')
                });
        }

        function prepareToDeleteAsset () {
            var self = this;

            this.displayModal(
                {
                    msg : resources.asset.deletionWarning
                })
                .done(function () {
                    _deleteAsset.call(self);
                });
        }

        function editAsset () {
            var self = this;

            _getNewFileName.call(this)
                .done(function (modalData) {
                    _postRenamedAsset.call(self, modalData.data)
                        .done(function () {
                            _handleSuccessfulAssetRename.call(self, modalData.data);
                        })
                        .fail(function () {
                            _handleAssetRenameError.call(self);
                        });
                });
        }

        function postNewAsset () {
            var self = this;
            this.model.set('uploadError', false);
            AssetWorker.postNewAsset(this.model.get('nodeId'), this.model.get('fileData'))
                .done(function (response) {
                    _handleSuccessfulUpload.call(self, response);
                })
                .fail(function (error) {
                    _handleFailedUpload.call(self, error);
                })
                .progress(function (percentDone) {
                    _handleUploadProgress.call(self, percentDone);
                });
        }

        function cancelUpload () {
            this.remove();
        }

        function _deleteAsset () {
            var self = this;

            this.model.destroy()
                .done(function () {
                    _handleSuccessfulDelete.call(self);
                })
                .fail(function () {
                    _handleDeletionError.call(self);
                });
        }

        function _handleSuccessfulDelete () {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.asset.successfullyDeletedPre + this.model.get('fileName') +
                        resources.asset.successfullyDeletedPost,
                    status : true
                }
            );
            this.remove();
        }

        function _handleDeletionError () {
            this.displayAlertBox(
                {
                    msg : resources.asset.errorDeleted + this.model.get('fileName')
                }
            );
        }

        function _getNewFileName () {
            return this.displayModal(
                {
                    msg : resources.asset.editFileName,
                    type : 'input',
                    data : this.model.get('fileName')
                });
        }

        function _postRenamedAsset (newFileName) {
            return Api.renameAsset(this.model.urlRoot(), this.model.get('fileName'), newFileName);
        }

        function _handleSuccessfulAssetRename (newFileName) {
            var self = this;

            this.model.set('fileName', newFileName);
            this.model.fetch()
                .done(function () {
                    self.displayTemporaryAlertBox(
                        {
                            msg : resources.asset.editNameSuccess,
                            status : true
                        }
                    );
                });
        }

        function _handleAssetRenameError () {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.asset.editNameFail
                }
            );
        }

        function _handleUploadProgress (percentDone) {
            $('.meter').width(percentDone);
        }

        function _handleSuccessfulUpload (response) {
            var self = this;
            this.model.fetch()
                .done(function () {
                    self.model.unset('fileData');
                });
            this.displayTemporaryAlertBox(
                {
                    msg : response,
                    status : true
                }
            );
        }

        function _handleFailedUpload () {
            this.model.set('uploadError', true);
            handleUploadProgress.call(this, 0);
            this.displayTemporaryAlertBox(
                {
                    msg : resources.asset.uploadAssetError
                }
            );
        }

    });