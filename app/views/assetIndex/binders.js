define(['assetDetailView', 'text!views/assetDetail/_assetDetailRow.html'],
    function(AssetDetailView, assetDetailRowTemplate) {
    'use strict';

    return {
        'asset-detail-row' : function(el, model) {
            _addAssetDetailRow.call(this, el, model);
        }
    };

    function _addAssetDetailRow(el, model) {
        if(model) {
            var assetDetailView = new AssetDetailView({
                name : 'assetDetailRow',
                template : assetDetailRowTemplate,
                el : el,
                model : model
            });

            this.model.view.addChild(assetDetailView);
        }
    }
});
