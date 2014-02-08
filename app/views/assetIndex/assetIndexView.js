/*global define:false*/
define(['grasshopperBaseView', 'assetIndexViewConfig', 'assetDetailView', 'underscore',
    'text!views/assetDetail/_assetDetailRow.html', 'jquery', 'constants', 'resources'],
    function (GrasshopperBaseView, assetIndexViewConfig, AssetDetailView, _,
              assetDetailRowTemplate, $, constants, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : assetIndexViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender () {
            var self = this,
                assets;

            if (this.nodeId) {
                this.model.url = this.model.url.replace(':id', this.nodeId);
            } else {
                this.model.url = this.model.url.replace(':id', 0);
            }

            this.model.fetch()
                .done(function () {
                    console.log(self);
                    assets = _.omit(self.model.attributes, 'resources');

                    if(_.isEmpty(assets)) {
                        _addEmptyAssetsMessage.call(self);
                    }

                    _.each(assets, function (asset) {
                        _appendAssetDetailRow.call(self, asset);
                    });
                    self.app.router.mastheadView.model.set('filesCount', _.size(self.model.attributes) - 2);
                });
        }

        function _appendAssetDetailRow (asset) {
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

        function _addEmptyAssetsMessage() {
            var template = '<tr><td>[[= msg ]] <span><a href="[[= href ]]">[[= linkText ]]</a></span></td></tr>';

            $('#assetDetailRow').append(_.template(template, {
                msg : resources.asset.emptyNode,
                linkText : resources.asset.clickToAdd,
                href : constants.internalRoutes.createAssets.replace(':id', this.nodeId)
            }));
        }
    });