/*global define:false*/
define(['baseView', 'resources'], function (BaseView, resources) {

    return BaseView.extend({
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset
    });

    function handleRowClick(e) {
        e.stopPropagation();
        console.log(this.model.get('url'));
        this.displayModal('downloading / viewing of assets in Grasshopper has not been implemented.', 'image', 'http:/localhost:8080/5261781556c02c072a000007/Doom.jpg');

//        this.displayModal('downloading / viewing of assets in Grasshopper has not been implemented.', 'image', this.model.get('url'));
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