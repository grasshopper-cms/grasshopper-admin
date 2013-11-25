/*global define:false*/
define(['baseView', 'resources'], function (BaseView, resources) {

    return BaseView.extend({
        deleteNode : deleteNode,
        handleRowClick : handleRowClick
    });

    function deleteNode() {
        var self = this;

        this.displayModal(resources.node.deletionWarning)
            .done(function() {
                self.model.destroy(
                    {
                        success: function(model) {
                            self.remove();
                            self.displayTemporaryAlertBox(resources.node.successfullyDeletedPre + model.get('label') + resources.node.successfullyDeletedPost, true);
                        },
                        error: function(model) {
                            self.displayAlertBox(resources.node.errorDeleted + model.get('label'));
                        }
                    });
            });
    }

    function handleRowClick() {
        this.app.router.navigateTrigger(this.model.get('href'));
    }

});