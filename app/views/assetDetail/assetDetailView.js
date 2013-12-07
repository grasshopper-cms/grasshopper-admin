/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset
    });

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

        this.displayModal(resources.asset.deletionWarning)
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

});