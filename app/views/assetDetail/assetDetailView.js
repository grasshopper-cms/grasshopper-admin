/*global define:false*/
define(['baseView', 'resources'], function (BaseView, resources) {

    return BaseView.extend({
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset
    });

    function handleRowClick(e) {
        e.stopPropagation();
        console.log(this.model.get('url'));
        this.displayModal('downloading / viewing of assets in Grasshopper has not been implemented.', this.model.get('url'));
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