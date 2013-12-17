/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'assetDetailView', 'assetDetailViewConfig', 'text!views/assetDetail/_assetDetailRow.html'],
    function (GrasshopperBaseView, _, AssetDetailView, assetDetailViewConfig, assetDetailRowTemplate) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender
    });

    function afterRender() {
        if(this.model.get('nodeId') !== '0'){
            handleUpload.call(this);
        } else {
            uploadInRoot.call(this);
        }
    }

    function handleUpload() {
        var self = this;
        this.displayModal(
            {
                msg: 'Upload an Asset!',
                type: 'upload',
                data: {}
            })
            .done(function(modalData) {
                self.channels.views.trigger('activateTab', 'filesTab');
                _.each(modalData.files, function(file) {
                    appendAssetDetailRow.call(self, file);
                });
                navigateBack.call(self);
            })
            .fail(function() {
                navigateBack.call(self);
            });
    }

    function uploadInRoot() {
        var self = this;
        this.displayModal(
            {
                msg: 'You cannot upload assets in the Root.'
            })
            .always(function() {
                navigateBack.call(self);
            });
    }

     function navigateBack(trigger) {
         this.app.router.navigateBack(trigger);
         this.app.router.removeThisRouteFromBreadcrumb();
         this.remove();
     }

    function appendAssetDetailRow(file) {
        var assetDetailView = new AssetDetailView(_.extend({}, assetDetailViewConfig,
            {
                name : 'assetDetailRow',
                modelData : {
                        nodeId : this.model.get('nodeId'),
                        fileName : file.name,
                        size : file.size,
                        lastmodified : file.lastModifiedDate,
                        fileData : file
                    },
                el : '#assetDetailRow',
                templateHtml : assetDetailRowTemplate,
                mastheadButtons : this.options.mastheadButtons
            }
        ));
        assetDetailView.start();
    }

});