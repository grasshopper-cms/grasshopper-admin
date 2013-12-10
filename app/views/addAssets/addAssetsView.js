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
                    msg: 'Upload an Asset!',
                    type: 'upload',
                    data: {}
                })
            .done(function(data) {
                console.log(data);
                self.navigateBack();
            })
            .fail(function() {
                console.log('negator');
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
        this.app.router.breadcrumb.pop();
    }

});