/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'assetDetailView', 'assetDetailViewConfig', 'text!views/assetDetail/_assetDetailRow.html'],
    function (GrasshopperBaseView, _, AssetDetailView, assetDetailViewConfig, assetDetailRowTemplate) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        if(this.model.get('nodeId')){
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
            .done(function(data) {
                self.channels.views.trigger('activateTab', 'filesTab');
                _.each(data.files, function(file) {
                    appendAssetDetailRow.call(self, file);
                });
                self.navigateBack();
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function uploadInRoot() {
        var self = this;
        this.displayModal(
            {
                msg: 'You cannot upload assets in the Root.'
            })
            .always(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
        this.app.router.breadcrumb.pop();
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