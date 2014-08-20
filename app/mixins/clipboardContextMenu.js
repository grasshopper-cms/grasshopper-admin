define(['jquery', 'underscore', 'resources', 'helpers', 'constants'],
    function ($, _, resources, helpers, constants) {

        'use strict';
        var joiner = helpers.text.join;

        return {
            initClipboardMenu: initClipboardMenu
        };

        function initClipboardMenu (selector) {
            context.init(constants.contextConfig);

            context.attach(selector,
                [
                    {
                        text: joiner('<i class="fa fa-scissors"></i> ', resources.clipboard.cut),
                        action: _cut.bind(this)
                    },
                    {
                        text: joiner('<i class="fa fa-files-o"></i> ', resources.clipboard.copy),
                        action: _copy.bind(this)
                    },
                    {
                        text: joiner('<i class="fa fa-clipboard"></i> ', resources.clipboard.paste),
                        action: _paste.bind(this)
                    }
                ]
            );
        }

        function _cut (e) {
            var target = _getTarget(e);

            if (target) {
                $(target).closest('.clipboardTargetRow').trigger('clipboard:cut');
            }

            e.preventDefault();
        }

        function _copy (e) {
            var target = _getTarget(e);

            if (target) {
                $(target).closest('.clipboardTargetRow').trigger('clipboard:copy');
            }

            e.preventDefault();
        }

        function _paste (e) {
            var target = _getTarget(e),
                $nodeDetailRow,
                $target = $(target);

            if (target) {

                $nodeDetailRow = $target.closest('.clipboardTargetRow');

                if ($nodeDetailRow.length) {
                    $nodeDetailRow.trigger('clipboard:paste');
                }
                else {
                    $target.trigger('clipboard:paste');
                }

            }

            e.preventDefault();
        }

        function _getTarget (e) {
            return $(e.target).closest('.dropdown-context').data('contextTarget');
        }

    });