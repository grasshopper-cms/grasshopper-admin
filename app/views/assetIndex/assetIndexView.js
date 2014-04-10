/*global define:false*/
define(['grasshopperBaseView', 'assetIndexViewConfig'], function (GrasshopperBaseView, assetIndexViewConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : assetIndexViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender($deferred) {
            this.model.get('childAssets').fetch()
                .done($deferred.resolve);
        }


//        function _addEmptyAssetsMessage() {
//            var template = '<tr id="assetDetailRow">' +
//                '<td colspan="4">[[= msg ]] <span><a href="[[= href ]]">[[= linkText ]]</a></span></td></tr>';
//
//            $('#assetDetailTable').append(_.template(template, {
//                msg : resources.asset.emptyNode,
//                linkText : resources.asset.clickToAdd,
//                href : constants.internalRoutes.createAssets.replace(':id', this.nodeId)
//            }));
//        }
    });