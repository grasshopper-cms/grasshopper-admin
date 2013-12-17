/*global define:false*/
define(['grasshopperBaseView', 'resources'],
    function (GrasshopperBaseView, resources) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.thisIsNotImplemented
                })
            .done(function() {
                navigateBack.call(self);
            })
            .fail(function() {
                navigateBack.call(self);
            });
    }

    function navigateBack() {
        this.app.router.navigateBack();
        this.app.router.removeThisRouteFromBreadcrumb();
        this.remove();
    }

});