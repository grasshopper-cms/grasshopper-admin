/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'nodeIndexView',
    'assetIndexView', 'underscore', 'contentIndexView', 'breadcrumbWorker'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, NodeIndexView, AssetIndexView,
              _, ContentIndexView, breadcrumbWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentBrowseViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            refreshIndexViews : refreshIndexViews,
            activateTab : activateTab
        });

        function beforeRender ($deferred) {
            buildMastheadBreadcrumb.call(this)
                .done(_addChildIndexViews.bind(this, $deferred))
                .fail($deferred.reject);
        }

        function afterRender () {
            this.$el.foundation();
        }

        function _addChildIndexViews ($deferred) {
            _addNodeIndexView.call(this);
            _addAssetIndexView.call(this);
            _addContentIndexView.call(this);
            $deferred.resolve();
        }

        function refreshIndexViews () {
            this.refreshChildren();
        }

        function _addNodeIndexView () {
            var nodeIndexView = new NodeIndexView({
                    nodeId : this.model.get('nodeId'),
                    mastheadButtons : null
                });
            this.addChild(nodeIndexView);
        }

        function _addAssetIndexView() {
            if (!this.model.get('inRoot')) {
                var assetIndexView = new AssetIndexView({
                        nodeId : this.model.get('nodeId'),
                        inRoot : this.model.get('inRoot'),
                        mastheadButtons : null
                    });
                this.addChild(assetIndexView);
            }
        }

        function _addContentIndexView () {
            if (!this.model.get('inRoot')) {
                var contentIndexView = new ContentIndexView({
                        nodeId : this.model.get('nodeId'),
                        mastheadButtons : null,
                        el : '#contentDetailRow'
                    });
                this.addChild(contentIndexView);
            }
        }

        function buildMastheadBreadcrumb () {
            var $deferred = new $.Deferred();

            breadcrumbWorker.contentBrowse.call(this, $deferred);

            return $deferred.promise();
        }

        function activateTab (tab) {
            $('#' + tab + ' a').click();
        }
    });