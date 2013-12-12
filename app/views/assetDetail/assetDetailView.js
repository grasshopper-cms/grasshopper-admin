/*global define:false*/
define(['grasshopperBaseView', 'resources', 'api', 'assetWorker'], function (GrasshopperBaseView, resources, Api, AssetWorker) {

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset,
        editAsset : editAsset
    });

    function afterRender() {
        if(this.model.has('fileData')) {
            postNewAsset.call(this);
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
            .done(function(data) {
                Api.renameAsset(self.model.urlRoot(), self.model.get('fileName'), data)
                    .done(function() {
                        self.model.set('fileName', data);
                        self.displayTemporaryAlertBox(
                            {
                                msg: resources.asset.editNameSuccess,
                                status: true
                            }
                        );
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
        AssetWorker.postNewAsset(this.model.get('nodeId'), this.model.get('fileData'))
            .done(function(response) {
                // Flash success then completely remove the fileData from the model
                console.log(response);
            })
            .fail(function(error) {
                // Flash as FAIL and throw up a retry button
                console.log(error);
            })
            .progress(function(percentDone) {
                // Update the width of the progress bar
                console.log(percentDone);
            });
    }

});