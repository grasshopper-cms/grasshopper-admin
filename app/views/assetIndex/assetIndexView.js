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

        function beforeRender() {
            var inRoot = this.model.get('inRoot');

            if (inRoot) {
                this.model.url = this.model.url.replace(':id', 0);
            } else {
                this.model.url = this.model.url.replace(':id', this.nodeId);
            }

            this.model.fetch()
                .done(_doStuff.bind(this));
        }

        function _doStuff() {
            var assets = _.omit(this.model.attributes, 'resources');

            if(_.isEmpty(assets)) {
                _addEmptyAssetsMessage.call(this);
            }

            _.each(assets, _appendAssetDetailRow.bind(this));

            _updateMastheadFilesCount.call(this);
        }

        function _updateMastheadFilesCount() {
            this.app.router.mastheadView.model.set('filesCount', _.size(this.model.attributes) - 2);
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