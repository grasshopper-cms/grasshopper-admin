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
            activateTab : activateTab,
            createContent : createContent,
            createAssets : createAssets,
            createFolder : createFolder,
            addNewNode : addNewNode,
            addNewAsset : addNewAsset,
            editNodeName : editNodeName,
            editNodeContentTypes : editNodeContentTypes,
            deleteNode : deleteNode,
            doQuery : doQuery
        });

        function beforeRender ($deferred) {
            $.when(
                _buildMastheadBreadcrumb.call(this),
                this.model.fetch(),
                this.model.get('childNodes').fetch(),
                this.model.get('childContent').query())
                .done($deferred.resolve, _addAssetIndexView.bind(this))
                .fail($deferred.reject);
        }

        function afterRender () {
            this.$el.foundation();
        }

        function _addAssetIndexView() {
            if (!this.model.get('inRoot')) {
                this.model.get('childAssets').fetch();
            }
        }

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

        function addNewAsset(newAssetPayload) {
            this.model.get('childAssets').add(newAssetPayload);
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

        function doQuery() {
            this.model.get('childContent').searchQuery(this.model.get('contentSearchValue'));
        }

        function _closeActionsDropdown() {
            $('#actionsDropdown').click();
        }

    });