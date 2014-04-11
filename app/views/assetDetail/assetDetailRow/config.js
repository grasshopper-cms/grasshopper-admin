define(['assetDetailViewConfig', 'jquery', 'text!views/assetDetail/assetDetailRow/template.html'],
    function(assetDetailViewConfig, $, template) {
        'use strict';

        return $.extend(true, {}, assetDetailViewConfig, {
            name : 'assetDetailRow',
            template : template
        });
    });