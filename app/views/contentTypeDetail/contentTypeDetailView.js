/*global define:false*/
define(['baseView', 'resources'], function (BaseView, resources) {

    return BaseView.extend({
        beforeRender : beforeRender,
        deleteContentType : deleteContentType
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
        this.model.destroy(
            {
                success: function(model) {
                    self.displayAlertBox(resources.contentType.successfullyDeletedPre + model.get('label') + resources.contentType.successfullyDeletedPost, true);
                    self.remove();
                },
                error: function(model) {
                    self.displayAlertBox(resources.contentType.errorDeleted + model.get('label'));
                }
            });
    }

});