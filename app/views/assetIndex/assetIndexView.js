/*global define:false*/
define(['grasshopperBaseView', 'assetDetailView', 'assetDetailViewConfig', 'underscore',
    'text!views/assetDetail/_assetDetailRow.html'],
    function (GrasshopperBaseView, AssetDetailView, assetDetailViewConfig, _, assetDetailRowTemplate) {
    'use strict';

    return GrasshopperBaseView.extend({
        beforeRender: beforeRender,
        appendAssetDetailRow : appendAssetDetailRow
    });

    function beforeRender() {
        var self = this;

        if(this.options.nodeId) {
            this.model.url = this.model.url.replace(':id', this.options.nodeId);
        } else {
            this.model.url = this.model.url.replace(':id', 0);
        }

        this.model.fetch()
            .done(function() {
                _.each(self.model.attributes, function(asset) {
                    if(_.has(asset, 'url')) {
                        self.appendAssetDetailRow(asset);
                    }
                });
                self.app.router.mastheadView.model.set('filesCount', _.size(self.model.attributes) - 2);
            });
    }

    function appendAssetDetailRow(asset) {
        var assetDetailView = new AssetDetailView(_.extend({}, assetDetailViewConfig,
            {
                name : 'assetDetailRow',
                modelData : _.extend(asset,
                    {
                        nodeId : this.options.nodeId
                    }
                ),
                el : '#assetDetailRow',
                templateHtml : assetDetailRowTemplate,
                mastheadButtons : this.options.mastheadButtons
            }
        ));
        assetDetailView.start();
    }

    return assetIndexView;
});