/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        beforeRender : beforeRender,
        deleteContentType : deleteContentType,
        handleRowClick : handleRowClick
    });

    function beforeRender () {
        var self = this;
        if(!this.model.has('_id')) {
            this.model.fetch()
                .done(function() {
                    self.$el.foundation('forms');
                })
                .fail(function() {
                    // TODO: Error Handling
                });
        }
    }

    function deleteContentType() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.contentType.deletionWarning
                })
            .done(function() {
                self.model.destroy(
                    {
                        success: function(model) {
                            self.displayTemporaryAlertBox(resources.contentType.successfullyDeletedPre + model.get('label') + resources.contentType.successfullyDeletedPost, true);
                            self.remove();
                        },
                        error: function(model) {
                            self.displayAlertBox(resources.contentType.errorDeleted + model.get('label'));
                        }
                    });
            });
    }

    function handleRowClick(e) {
        e.stopPropagation();
        this.app.router.navigateTrigger(this.model.get('href'), {}, true);
    }

});