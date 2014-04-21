/*global define:false*/
define(['grasshopperBaseView', 'assetIndexViewConfig'], function (GrasshopperBaseView, assetIndexViewConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : assetIndexViewConfig,
            beforeRender : beforeRender,
            addNewAsset : addNewAsset
        });

        function beforeRender($deferred) {
            this.model.get('childAssets').fetch()
                .done($deferred.resolve);
        }

        function addNewAsset(newAssetPayload) {
            this.model.get('childAssets').add(newAssetPayload);
        }

    });