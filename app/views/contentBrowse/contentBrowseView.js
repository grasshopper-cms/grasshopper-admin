/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery',
    'underscore', 'breadcrumbWorker', 'constants', 'nodeWorker'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $,
              _, breadcrumbWorker, constants, nodeWorker) {
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
            addNewNode : addNewNode,
            editNodeName : editNodeName,
            editNodeContentTypes : editNodeContentTypes,
            deleteNode : deleteNode
        });

        function beforeRender ($deferred) {
            $.when(
                _buildMastheadBreadcrumb.call(this),
                this.model.fetch(),
                this.model.get('childNodes').fetch())
                .done(_addChildIndexViews.bind(this, $deferred))
                .fail($deferred.reject);
        }

        function afterRender () {
            this.$el.foundation();
        }

        function _addChildIndexViews ($deferred) {
//            _addAssetIndexView.call(this);
//            _addContentIndexView.call(this);
            $deferred.resolve();
        }

        function refreshIndexViews () {
            this.refreshChildren();
        }

//        function _addAssetIndexView() {
//            if (!this.model.get('inRoot')) {
//                var assetIndexView = new AssetIndexView({
//                        modelData : {
//                            nodeId : (this.model.get('nodeId')) ? this.model.get('nodeId') : 0
//                        }
//                    });
//                this.addChild(assetIndexView);
//            }
//        }

//        function _addContentIndexView () {
//            if (!this.model.get('inRoot')) {
//                var contentIndexView = new ContentIndexView({
//                        nodeId : this.model.get('nodeId'),
//                        el : '#contentDetailRow'
//                    });
//                this.addChild(contentIndexView);
//            }
//        }

        function _buildMastheadBreadcrumb () {
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

        function addNewNode(nodeName) {
            this.model.get('childNodes').add({
                label : nodeName,
                parent : this.model.get('nodeId')
            });
        }

        function editNodeName() {
            nodeWorker.editName.call(this)
                .done(breadcrumbWorker.resetBreadcrumb.bind(this), _buildMastheadBreadcrumb.bind(this));
            _closeActionsDropdown.call();
        }

        function editNodeContentTypes() {
            nodeWorker.editContentTypes.call(this);
            _closeActionsDropdown.call();
        }

        function deleteNode() {
            nodeWorker.deleteNode.call(this);
            _closeActionsDropdown.call();
        }

        function _closeActionsDropdown() {
            $('#actionsDropdown').click();
        }

    });