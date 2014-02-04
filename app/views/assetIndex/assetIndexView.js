/*global define:false*/
define(['grasshopperBaseView', 'assetIndexViewConfig', 'assetDetailView', 'underscore',
    'text!views/assetDetail/_assetDetailRow.html'],
    function (GrasshopperBaseView, assetIndexViewConfig, AssetDetailView, _,
              assetDetailRowTemplate) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : assetIndexViewConfig,
            beforeRender : beforeRender,
            appendAssetDetailRow : appendAssetDetailRow
        });

        function beforeRender () {
            var self = this;

            if (this.nodeId) {
                this.model.url = this.model.url.replace(':id', this.nodeId);
            } else {
                this.model.url = this.model.url.replace(':id', 0);
            }

            this.model.fetch()
                .done(function () {
                    _.each(self.model.attributes, function (asset) {
                        if (_.has(asset, 'url')) {
                            self.appendAssetDetailRow(asset);
                        }
                    });
                    self.app.router.mastheadView.model.set('filesCount', _.size(self.model.attributes) - 2);
                });
        }

        function appendAssetDetailRow (asset) {
            var assetDetailView = new AssetDetailView({
                    name : 'assetDetailRow',
                    modelData : _.extend(asset, { nodeId : this.nodeId }),
                    appendTo : '#assetDetailRow',
                    wrapper : false,
                    template : assetDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            assetDetailView.start();
        }
    });