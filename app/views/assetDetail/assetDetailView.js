/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset
    });

    function handleRowClick(e) {
        e.stopPropagation();
        console.log(this.model.get('url'));
        this.displayModal(
            {
                msg: this.model.get('fileName'),
                type: 'image',
                data: 'http://localhost:8080/5261781556c02c072a000007/Doom.jpg'
            });
        // TODO: This line above needs to be deleted and the line below needs to be uncommented when the bug with the asset URL is fixed from the API side.
//        this.displayModal(
//            {
//                  msg: this.model.get('fileName'),
//                  type: 'image',
//                  data: this.model.get('url')
//            });
    }

    function deleteAsset() {
        var self = this;

        this.displayModal(resources.asset.deletionWarning)
            .done(function() {
                self.model.destroy()
                    .done(function() {
                        self.displayTemporaryAlertBox(resources.asset.successfullyDeletedPre + self.model.get('fileName') + resources.asset.successfullyDeletedPost, true);
                        self.remove();
                    })
                    .fail(function() {
                        self.displayAlertBox(resources.asset.errorDeleted + self.model.get('fileName'));
                    });
            });
    }

});