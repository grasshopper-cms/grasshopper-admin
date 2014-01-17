/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'assetDetailView', 'assetDetailViewConfig',
    'text!views/assetDetail/_assetDetailRow.html', 'resources'],
    function (GrasshopperBaseView, _, AssetDetailView, assetDetailViewConfig, assetDetailRowTemplate, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender () {
            //TODO: I am doing this node ==='0' check in three different files right now,
            // addAssetsView, assContentView, and addFolderView.
            // Figure out a better way. Maybe in before routing?
            if (this.model.get('nodeId') !== '0') {
                _handleUpload.call(this);
            } else {
                _uploadInRoot.call(this);
            }
        }

        function _handleUpload () {
            var self = this;
            this.displayModal(
                {
                    msg : resources.asset.uploadAssetModalMsg,
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

        function _uploadInRoot () {
            this.displayModal(
                {
                    msg : resources.asset.uploadInRoot
                })
                .always(_navigateBack.bind(this));
        }

        function _navigateBack (trigger) {
            this.app.router.navigateBack(trigger);
            this.app.router.removeThisRouteFromBreadcrumb();
            this.remove();
        }

        function _appendAssetDetailRow (file) {
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
                    template : assetDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                }
            ));
            assetDetailView.start();
        }

    });