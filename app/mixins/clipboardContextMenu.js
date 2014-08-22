define(['jquery', 'underscore', 'resources', 'helpers', 'constants', 'clipboardWorker'],
    function($, _, resources, helpers, constants, clipboardWorker) {

        'use strict';
        var joiner = helpers.text.join;

        return {
            initClipboardMenu: initClipboardMenu
        };

        function initClipboardMenu(selector, viewContext) {
            var shouldCreate = false;

            if (selector == '#assetIndex') {
                shouldCreate = _hasAssets.call(this, viewContext);
            } else {
                shouldCreate = _hasContentOrNodes.call(this, viewContext);
            }
            if (shouldCreate) {
                _createAndAttach.call(this, selector);
            } else {
                if (clipboardWorker.hasPasteItem) {
                    _createWithOnlyPaste.call(this, selector);
                } else {
                    _destroyContext.call(this, selector, viewContext);
                }
            }
        }

        function _createAndAttach(selector) {
            var defaultMenu = [{
                text: joiner('<i class="fa fa-scissors"></i> ', resources.clipboard.cut),
                action: _cut.bind(this)
            }, {
                text: joiner('<i class="fa fa-files-o"></i> ', resources.clipboard.copy),
                action: _copy.bind(this)
            }];

            context.init(constants.contextConfig);

            if (clipboardWorker.hasPasteItem) {
                defaultMenu.push({
                    text: joiner('<i class="fa fa-clipboard"></i> ', resources.clipboard.paste),
                    action: _paste.bind(this)
                });
            } else {
                clipboardWorker.on('hasClipboardItem', _createAndAttach.bind(this, selector));
            }
            clipboardWorker.on('pasteDone', _createAndAttach.bind(this, selector));

            context.attach(selector, defaultMenu);
        }

        function _createWithOnlyPaste(selector) {
            context.init(constants.contextConfig);

            context.attach(selector, [{
                text: joiner('<i class="fa fa-clipboard"></i> ', resources.clipboard.paste),
                action: _paste.bind(this)
            }]);

            clipboardWorker.on('pasteDone', _createAndAttach.bind(this, selector));

        }

        function _destroyContext(selector, view) {

            if (selector == '#assetIndex') {
                view.channels.views.on('assetAdded', _createAndAttach.bind(this, selector));
            }

            context.destroy(selector);
        }

        function _hasAssets(view) {
            var create = false;

            if (view.model.get('childAssets').length) {
                create = true;
            }

            return create;
        }

        function _hasContentOrNodes(view) {
            var create = false;

            if (view.model.get('childNodes').length || view.model.get('childContent').length) {
                create = true;
            }

            return create;
        }

        function _cut(e) {
            var target = _getTarget(e);

            if (target) {
                $(target).closest('.clipboardTargetRow').trigger('clipboard:cut');
            }

            e.preventDefault();
        }

        function _copy(e) {
            var target = _getTarget(e);

            if (target) {
                $(target).closest('.clipboardTargetRow').trigger('clipboard:copy');
            }

            e.preventDefault();
        }

        function _paste(e) {
            var target = _getTarget(e),
                $nodeDetailRow,
                $target = $(target);

            if (target) {

                $nodeDetailRow = $target.closest('.clipboardTargetRow');

                if ($nodeDetailRow.length) {
                    $nodeDetailRow.trigger('clipboard:paste');
                } else {
                    $target.trigger('clipboard:paste');
                }

            }

            e.preventDefault();
        }

        function _getTarget(e) {
            return $(e.target).closest('.dropdown-context').data('contextTarget');
        }

    });
