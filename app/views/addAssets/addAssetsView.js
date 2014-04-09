/*global define:false*/
define(['grasshopperBaseView', 'addAssetsViewConfig', 'underscore', 'assetDetailView', 'assetDetailViewConfig',
    'text!views/assetDetail/_assetDetailRow.html', 'resources'],
    function (GrasshopperBaseView, addAssetsViewConfig, _, AssetDetailView, assetDetailViewConfig,
              assetDetailRowTemplate, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : addAssetsViewConfig,
            afterRender : afterRender
        });

        function afterRender () {
            _handleUpload.call(this);
        }

        function _handleUpload () {
            var self = this;
            this.displayModal(
                {
                    header : resources.asset.uploadAssetModalMsg,
                    type : 'upload',
                    data : {}
                })
                .done(function (modalData) {
                    self.channels.views.trigger('activateTab', 'filesTab');
                    _.each(modalData.files, function (file) {
                        _appendAssetDetailRow.call(self, file);
                    });
                    _navigateBack.call(self);
                })
                .fail(_navigateBack.bind(this));
        }


        function _navigateBack (trigger) {
            this.app.router.removeThisRouteFromBreadcrumb();
            this.app.router.navigateBack(trigger);
            this.remove();
        }

        function _appendAssetDetailRow (file) {
            var assetDetailView = new AssetDetailView({
                    name : 'assetDetailRow',
                    modelData : {
                        nodeId : this.model.get('nodeId'),
                        fileName : file.name,
                        size : file.size,
                        lastmodified : file.lastModifiedDate,
                        fileData : file
                    },
                    appendTo : '#assetDetailRow',
                    wrapper : false,
                    template : assetDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            assetDetailView.start();
        }

    });