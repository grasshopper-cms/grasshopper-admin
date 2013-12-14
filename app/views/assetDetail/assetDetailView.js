/*global define:false*/
define(['grasshopperBaseView', 'resources', 'api', 'assetWorker', 'jquery'],
    function (GrasshopperBaseView, resources, Api, AssetWorker, $) {

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset,
        editAsset : editAsset,
        postNewAsset : postNewAsset,
        cancelUpload : cancelUpload
    });

    function afterRender() {
        if(this.model.has('fileData')) {
            this.postNewAsset();
        }
    }

    function handleRowClick(e) {
        e.stopPropagation();
        this.displayModal(
            {
                  msg: this.model.get('fileName'),
                  type: 'image',
                  data: this.model.get('url')
            });
    }

    function deleteAsset() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.asset.deletionWarning
                })
            .done(function() {
                self.model.destroy()
                    .done(function() {
                        self.displayTemporaryAlertBox(
                            {
                                msg: resources.asset.successfullyDeletedPre + self.model.get('fileName') + resources.asset.successfullyDeletedPost,
                                status: true
                            }
                        );
                        self.remove();
                    })
                    .fail(function() {
                        self.displayAlertBox(
                            {
                                msg: resources.asset.errorDeleted + self.model.get('fileName')
                            }
                        );
                    });
            });
    }

    function editAsset() {
        var self = this;

        this.displayModal(
            {
                msg: resources.asset.editFileName,
                type: 'input',
                data: this.model.get('fileName')
            })
            .done(function(newName) {
                Api.renameAsset(self.model.urlRoot(), self.model.get('fileName'), newName)
                    .done(function() {
                        self.model.set('fileName', newName);
                        self.model.fetch()
                            .done(function() {
                                self.displayTemporaryAlertBox(
                                    {
                                        msg: resources.asset.editNameSuccess,
                                        status: true
                                    }
                                );
                            });
                    })
                    .fail(function() {
                        self.displayTemporaryAlertBox(
                            {
                                msg: resources.asset.editNameFail
                            }
                        );
                    });
            });
    }

    function postNewAsset() {
        var self = this;
        this.model.set('uploadError', false);
        AssetWorker.postNewAsset(this.model.get('nodeId'), this.model.get('fileData'))
            .done(function(response) {
                handleSuccessfulUpload.call(self, response);
            })
            .fail(function(error) {
                handleFailedUpload.call(self, error);
            })
            .progress(function(percentDone) {
                handleUploadProgress.call(self, percentDone);
            });
    }

    function handleUploadProgress(percentDone) {
        $('.meter').width(percentDone);
    }

    function handleSuccessfulUpload(response) {
        var self = this;
        $('.meter').text(response);
        this.model.fetch()
            .done(function() {
                self.model.unset('fileData');
            });
        this.displayTemporaryAlertBox(
            {
                msg: response,
                status: true
            }
        );
    }

    function handleFailedUpload(error) {
        this.model.set('uploadError', true);
        this.displayTemporaryAlertBox(
            {
                msg: resources.asset.uploadAssetError
            }
        );
    }

    function cancelUpload() {
        this.remove();
    }

});