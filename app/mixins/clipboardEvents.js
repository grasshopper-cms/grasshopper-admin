define(['jquery', 'underscore', 'clipboardWorker', 'helpers'],
    function($, _, clipboardWorker, helpers) {
        'use strict';

        var joiner = helpers.text.join;

        return {
            setupClipboardEvents: setupClipboardEvents
        };

        function setupClipboardEvents() {
            this.$el.on('clipboard:cut', '.clipboardTargetRow', _handleCutEvent.bind(this));
            this.$el.on('clipboard:copy', '.clipboardTargetRow', _handleCopyEvent.bind(this));
            this.$el.on('clipboard:paste', '.clipboardTargetRow', _handlePasteEvent.bind(this));
            this.$el.on('clipboard:paste', '#contentBrowseTable', _handlePasteEvent.bind(this));
            this.$el.on('clipboard:paste', '#assetIndex', _handlePasteEvent.bind(this));
        }

        function _handleCutEvent(e) {
            clipboardWorker.cutContent(this, _getCutCopyRequest.call(this, e.currentTarget));
            clipboardWorker.hasPasteItem = true;
            clipboardWorker.trigger('hasClipboardItem');
        }

        function _handleCopyEvent(e) {
            clipboardWorker.copyContent(this, _getCutCopyRequest.call(this, e.currentTarget));
            clipboardWorker.hasPasteItem = true;
            clipboardWorker.trigger('hasClipboardItem');
        }

        function _handlePasteEvent(e) {
            var folderInfo = {
                type: 'node',
                id: this.model.id,
                name: this.model.get('label')
            };

            e.stopPropagation();

            clipboardWorker.pasteContent(this, folderInfo)
                .done(_afterPasteDone.bind(this));
        }

        function _getCutCopyRequest(target) {
            var rowType = _getRowType(target),
                itemId = $(target).data('id'),
                itemIdContainsSlashes = _.contains(itemId, '\\') || _.contains(itemId, '/');

            if (rowType == 'asset' && !itemIdContainsSlashes) {
                itemId = joiner(this.model.id, '/', itemId);
            }

            return {
                type: rowType,
                id: itemId,
                name: $('.clipboardTargetName', target).text()
            };
        }

        function _afterPasteDone() {
            $.when(this.model.fetch(),
                this.model.get('childNodes').fetch(),
                this.getChildContent(),
                this.addAssetIndexView())
            .done(function(){
                clipboardWorker.hasPasteItem = false;
                clipboardWorker.trigger('pasteDone');
            });

        }

        function _getRowType(el) {
            var $el = $(el),
                type;

            if ($el.hasClass('nodeDetailRow')) {
                type = 'node';
            } else if ($el.hasClass('contentDetailRow')) {
                type = 'content';
            } else if ($el.hasClass('assetDetailRow')) {
                type = 'asset';
            }
            return type;
        }

    });
