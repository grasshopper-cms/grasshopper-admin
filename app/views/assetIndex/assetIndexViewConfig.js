/*global define:false*/
define(['text!views/assetIndex/assetIndexView.html', 'assetIndexViewModel', 'formatters', 'assetDetailRow'],
    function (template, assetIndexViewModel, formatters, AssetDetailRow) {
        'use strict';

        return {
            name : 'assetIndexView',
            ModelType : assetIndexViewModel,
            appendTo : '#assetIndex',
            wrapper : false,
            template : template,
            listeners : [
                ['channels.views', 'assetAdded', 'addNewAsset']
            ],
            events : {},
            permissions : ['admin', 'reader', 'editor'],
            rivetsConfig : {
                formatters : [formatters],
                childViewBinders : {
                    'asset-detail-row' : AssetDetailRow
                }
            }
        };
    });