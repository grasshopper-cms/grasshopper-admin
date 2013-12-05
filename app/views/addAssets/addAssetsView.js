/*global define:false*/
define(['baseView', 'resources'],
    function (BaseView, resources) {
    'use strict';

    return BaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(resources.thisIsNotImplemented)
            .done(function() {
                self.navigateBack();
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
    }

});