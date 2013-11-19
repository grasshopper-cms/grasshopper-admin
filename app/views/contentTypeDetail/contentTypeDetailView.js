/*global define:false*/
define(['baseView'], function (BaseView) {

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
                success: function(model, response) {
                    console.log('success');
                    console.log(model);
                    console.log(response);
                    self.remove();
                },
                error: function(something, somethingElse) {
                    console.log('error');
                    console.log(something);
                    console.log(somethingElse);
                }
            });
    }

});