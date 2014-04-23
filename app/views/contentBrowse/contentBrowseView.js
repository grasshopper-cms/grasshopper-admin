/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'nodeIndexView',
    'assetIndexView', 'underscore', 'contentIndexView', 'breadcrumbWorker', 'constants'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, NodeIndexView, AssetIndexView,
              _, ContentIndexView, breadcrumbWorker, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentBrowseViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            refreshIndexViews : refreshIndexViews,
            activateTab : activateTab,
            createContent : createContent,
            createAssets : createAssets,
            createFolder : createFolder,
            editNodeName : editNodeName,
            editNodeContentTypes : editNodeContentTypes,
            deleteNode : deleteNode
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
                    modelData : {
                        nodeId : this.model.get('nodeId')
                    },
                    mastheadButtons : null
                });
            this.addChild(nodeIndexView);
            this.nodeIndexView = nodeIndexView;
        }

        function _addAssetIndexView() {
            if (!this.model.get('inRoot')) {
                var assetIndexView = new AssetIndexView({
                        modelData : {
                            nodeId : (this.model.get('nodeId')) ? this.model.get('nodeId') : 0
                        },
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

        function createContent() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.addContent.replace(':id', this.model.get('nodeId')));
        }

        function createAssets() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.createAssets.replace(':id', this.model.get('nodeId')));
        }

        function createFolder() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.createFolder.replace(':id', this.model.get('nodeId')));
        }

        function editNodeName() {
            this.nodeIndexView.editNodeName();
            _closeActionsDropdown.call();
        }

        function editNodeContentTypes() {
            this.nodeIndexView.editNodeContentTypes();
            _closeActionsDropdown.call();
        }

        function deleteNode() {
            this.nodeIndexView.deleteNode();
            _closeActionsDropdown.call();
        }

        function _closeActionsDropdown() {
            $('#actionsDropdown').click();
        }


    });