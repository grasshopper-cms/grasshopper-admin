/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'searchWorker',
    'underscore', 'breadcrumbWorker', 'constants', 'nodeWorker', 'addFolderViewConfig', 'clipboardWorker'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, searchWorker,
              _, breadcrumbWorker, constants, nodeWorker, addFolderViewConfig, clipboardWorker) {
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
        });

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
            _initClipboard.call(this);
        }

        function _initClipboard() {
            var self = this;
            context.init({preventDoubleContext: true, compress: true});

            context.attach('#contentBrowseTable', [
                {text: '<i class="fa fa-scissors"></i> Cut', action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget');
                    if (target) {
                        $(target).closest('.nodeOrContentDetailRow').trigger('clipboard:cut');
                    }

                }},
                {text: '<i class="fa fa-files-o"></i> Copy', action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget');
                    if (target) {
                        $(target).closest('.nodeOrContentDetailRow').trigger('clipboard:copy');
                    }
                }},
                {text: '<i class="fa fa-clipboard"></i> Paste', action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget'), $target = $(target);
                    if (target) {
                        var $nodeDetailRow = $target.closest('.nodeOrContentDetailRow');
                        if ($nodeDetailRow.length) {
                            $nodeDetailRow.trigger('clipboard:paste');
                        }
                        else {
                            $target.trigger('clipboard:paste');
                        }

                    }
                }}
            ]);

            var _getRowType = function (el) {
                var $el = $(el), type;
                if ($el.hasClass('nodeDetailRow')) {
                    type = 'node';
                } else if ($el.hasClass('contentDetailRow')) {
                    type = 'content';
                }
                return type;
            };

            this.$el.on('clipboard:cut', '.nodeOrContentDetailRow', function() {
                clipboardWorker.cutContent(self, {type: _getRowType(this), id: $(this).data('id'), name: $('.contentDetailRowName', this).text() });
            });
            this.$el.on('clipboard:copy', '.nodeOrContentDetailRow', function() {
                clipboardWorker.copyContent(self, {type: _getRowType(this), id: $(this).data('id'), name: $('.contentDetailRowName', this).text() });
            });
            this.$el.on('clipboard:paste', '.nodeOrContentDetailRow', function(e) {
                e.stopPropagation();
                var clickedItemId = $(this).data('id'), currentFolderId = self.model.id;
                clipboardWorker.pasteContent(self,
                    {type: _getRowType(this), id: clickedItemId, name: $('.contentDetailRowName', this).text()},
                    {type: 'node', id: currentFolderId, name: self.model.get('label')}).done(function() {
                        self.model.get('childNodes').fetch();
                        _getChildContent.call(self);
                    });
            });
            this.$el.on('clipboard:paste', '#contentBrowseTable', function () {
                var currentFolderId = self.model.id;
                clipboardWorker.pasteContent(self, undefined,
                    {type: 'node', id: currentFolderId, name: self.model.get('label')}
                ).done(function() {
                        self.model.get('childNodes').fetch();
                        _getChildContent.call(self);
                    });
            });
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