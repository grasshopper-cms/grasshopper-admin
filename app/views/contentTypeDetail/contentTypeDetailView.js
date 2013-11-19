/*global define:false*/
define(['baseView'], function (BaseView) {

    return BaseView.extend({
        beforeRender : beforeRender
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

});