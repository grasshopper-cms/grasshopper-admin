/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'searchWorker',
    'underscore', 'breadcrumbWorker', 'constants', 'nodeWorker', 'addFolderViewConfig',
    'mixins/clipboardContextMenu', 'mixins/clipboardEvents'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, searchWorker,
              _, breadcrumbWorker, constants, nodeWorker, addFolderViewConfig,
              clipboardContextMenu, clipboardEvents) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentBrowseViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            activateTab : activateTab,
            addAssetIndexView : addAssetIndexView,
            createContent : createContent,
            createAssets : createAssets,
            createFolder : createFolder,
            addNewNode : addNewNode,
            addNewAsset : addNewAsset,
            editNodeName : editNodeName,
            editNodeContentTypes : editNodeContentTypes,
            deleteNode : deleteNode,
            getChildContent : getChildContent,
            searchContent : searchContent,
            hasCreateFolderPermission: hasCreateFolderPermission,
            toggleSortContentByLabel : toggleSortContentByLabel,
            toggleSortContentByType : toggleSortContentByType,
            toggleSortByLastModified : toggleSortByLastModified,
            remove : remove
        })
            .extend(clipboardContextMenu)
            .extend(clipboardEvents);

        function beforeRender ($deferred) {
            $.when(
                    _buildMastheadBreadcrumb.call(this),
                    this.model.fetch(),
                    this.model.get('childNodes').fetch(),
                    this.getChildContent(),
                    this.addAssetIndexView())
                .done($deferred.resolve)
                .fail($deferred.reject);
        }

        function afterRender () {
            this.initClipboardMenu('#contentPanel');
            this.initializeClipboardListeners('#contentPanel');
            this.initClipboardMenu('#assetIndex');
            this.initializeClipboardListeners('#assetIndex');
            this.setupClipboardEvents();
        }

        function addAssetIndexView() {
            if (!this.model.get('inRoot')) {
                this.model.get('childAssets').reset();
                return this.model.get('childAssets').fetch();
            }
        }

        function _buildMastheadBreadcrumb () {
            var $deferred = new $.Deferred();

            breadcrumbWorker.contentBrowse.call(this, $deferred);

            return $deferred.promise();
        }

        function getChildContent() {
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

        function toggleSortContentByLabel() {
            var childNodesCollection = this.model.get('childNodes'),
                childContentCollection = this.model.get('childContent');

            if(this.model.get('currentSort') === 'label') {
                childContentCollection.comparator = function(modelA, modelB) {
                    var modelALabel = modelA.get('fields.'+ modelA.get('meta.labelfield') ).toLowerCase(),
                        modelBLabel = modelB.get('fields.'+ modelB.get('meta.labelfield') ).toLowerCase();

                    if(modelALabel.localeCompare(modelBLabel)) {
                        return 1;
                    }
                    if(modelBLabel.localeCompare(modelALabel)) {
                        return -1;
                    }
                    return 0;
                };
                childContentCollection.sort();
                // childNodesCollection.comparator = function(modelA, modelB) {
                //     return model.get('label').toLowerCase();
                // };
                // childNodesCollection.sort();

            } else {
                childContentCollection.comparator = function(modelA, modelB) {
                    var modelALabel = modelA.get('fields.'+ modelA.get('meta.labelfield') ).toLowerCase(),
                        modelBLabel = modelB.get('fields.'+ modelB.get('meta.labelfield') ).toLowerCase();

                    if(modelALabel.localeCompare(modelBLabel)) {
                        return -1;
                    }
                    if(modelBLabel.localeCompare(modelALabel)) {
                        return 1;
                    }
                    return 0;
                };
                childContentCollection.sort();
                // childNodesCollection.comparator = function(modelA, modelB) {
                //     return model.get('label').toLowerCase();
                // };
                // childNodesCollection.sort();
            }

            this.model.set('currentSort', 'label');
            childContentCollection.trigger('change', childContentCollection);
            childNodesCollection.trigger('change', childNodesCollection);

            // this.model.get('childContent').sortBy('fields[meta.labelField]');
        }

        function toggleSortContentByType() {
            var childContentCollection = this.model.get('childContent');

            this.model.set('currentSort', 'type');

            childContentCollection.comparator = function(model) {
                return model.get('meta.typelabel').toLowerCase();
            };
            childContentCollection.sort();
            childContentCollection.trigger('change', childContentCollection);
        }

        function toggleSortByLastModified() {
            this.model.set('currentSort', 'modified');
        }

        function remove() {
            this.removeClipboardMenu();
            this.removeClipboardEvents();
            GrasshopperBaseView.prototype.remove.call(this);
        }

    });
