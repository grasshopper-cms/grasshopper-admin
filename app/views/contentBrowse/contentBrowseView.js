/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'searchWorker',
    'underscore', 'breadcrumbWorker', 'constants', 'nodeWorker', 'addFolderViewConfig', 'clipboardWorker', 'mixins/clipboardContextMenu'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, searchWorker,
              _, breadcrumbWorker, constants, nodeWorker, addFolderViewConfig, clipboardWorker, clipboardContextMenu) {
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
            searchContent : searchContent,
            hasCreateFolderPermission: hasCreateFolderPermission
        }).extend(clipboardContextMenu);

        function beforeRender ($deferred) {
            $.when(
                _buildMastheadBreadcrumb.call(this),
                this.model.fetch(),
                this.model.get('childNodes').fetch(),
                _getChildContent.call(this))
                .done($deferred.resolve, _addAssetIndexView.bind(this))
                .fail($deferred.reject);
        }

        function afterRender () {
            this.$el.foundation();
            this.initClipboardMenu('#contentBrowseTable');
            this.initClipboardMenu('#assetIndex');
            _setupClipboardEvents.call(this);
        }

        function _setupClipboardEvents() {
            var self = this;

            function _getCutCopyRequest() {
                var rowType = _getRowType(this),
                    itemId = $(this).data('id'),
                    itemIdContainsSlashes = _.contains(itemId, '\\') || _.contains(itemId, '/');
                if (rowType == 'asset' && !itemIdContainsSlashes) {
                    itemId = self.model.id + '/' + itemId;
                }
                return {type: rowType, id: itemId, name: $('.clipboardTargetName', this).text() };
            }

            this.$el.on('clipboard:cut', '.clipboardTargetRow', function (e) {
                clipboardWorker.cutContent(self, _getCutCopyRequest.call(this));
            });
            this.$el.on('clipboard:copy', '.clipboardTargetRow', function (e) {
                clipboardWorker.copyContent(self, _getCutCopyRequest.call(this));
            });

            var handlePaste = function (e) {
                var clickedItemId = $(this).data('id'),
                    currentFolderId = self.model.id,
                    currentFolderName = self.model.get('label'),
                    clipboardRowName = $('.clipboardTargetName', this).text();
                // var isRowClick=$(e.target).hasClass('clipboardTargetRow');

                e.stopPropagation();

                clipboardWorker.pasteContent(self,
                    {type: _getRowType(this), id: clickedItemId, name: clipboardRowName},
                    {type: 'node', id: currentFolderId, name: currentFolderName}).done(function (data) {
                        self.model.get('childNodes').fetch();
                        _addAssetIndexView.call(self);
                        _getChildContent.call(self);
                    });

            };

            this.$el.on('clipboard:paste', '.clipboardTargetRow', handlePaste);
            this.$el.on('clipboard:paste', '#contentBrowseTable', handlePaste);
            this.$el.on('clipboard:paste', '#assetIndex', handlePaste);


        }

        function _getRowType (el) {
            var $el = $(el), type;
            if ($el.hasClass('nodeDetailRow')) {
                type = 'node';
            } else if ($el.hasClass('contentDetailRow')) {
                type = 'content';
            } else if ($el.hasClass('assetDetailRow')){
                type = 'asset';
            }
            return type;
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

        function _getChildContent() {
            if(!this.model.get('inRoot')) {
                return this.searchContent(undefined, undefined, true);
            }
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

        function _closeActionsDropdown() {
            $('#actionsDropdown').click();
        }

        function hasCreateFolderPermission(){
            var role = this.app.user ? this.app.user.get('role') : undefined;

            return _.contains(addFolderViewConfig.permissions, role);
        }

        function searchContent(e, context, isFirstQuery) {
            return searchWorker.searchContent.call(this, e, context, 'childContent', true, isFirstQuery);
        }

    });