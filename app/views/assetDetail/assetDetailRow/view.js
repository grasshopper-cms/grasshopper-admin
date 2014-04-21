define(['assetDetailView', 'assetDetailRowConfig'], function(AssetDetailView, assetDetailRowConfig) {
    'use strict';

    return AssetDetailView.extend({
        defaultOptions : assetDetailRowConfig
    });

});