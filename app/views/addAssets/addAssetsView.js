/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'createAssetWorker'],
    function (GrasshopperBaseView, _, $, createAssetWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: 'Upload an Asset! THIS CURRENTLY DOES NOT WORK WITH FILES THAT HAVE UNDERSCORES AND LARGE FILES.',
                    type: 'upload',
                    data: {}
                })
            .done(function(data) {
                _.each(data.files, function(file) {
                   appendAssetDetailRow.call(self, file);
                });
                self.navigateBack();
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
        this.app.router.breadcrumb.pop();
    }

    function appendAssetDetailRow(file) {
        createAssetWorker.postNewAsset(this.model.get('nodeId'), file);
    }

});