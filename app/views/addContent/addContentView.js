/*global define:false*/
define(['grasshopperBaseView', 'resources'],
    function (GrasshopperBaseView, resources) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.thisIsNotImplemented
                })
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