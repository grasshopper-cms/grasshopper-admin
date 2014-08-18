define(['jquery', 'underscore', 'resources'],
    function ($, _, resources) {

        'use strict';

        return {
            initClipboardMenu : initClipboardMenu
        };

        function initClipboardMenu(selector) {
            context.init({preventDoubleContext: true, compress: true});

            context.attach(selector, [
                {text: '<i class="fa fa-scissors"></i> '+resources.clipboard.cut, action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget');
                    if (target) {
                        $(target).closest('.clipboardTargetRow').trigger('clipboard:cut');
                    }

                }},
                {text: '<i class="fa fa-files-o"></i> '+resources.clipboard.copy, action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget');
                    if (target) {
                        $(target).closest('.clipboardTargetRow').trigger('clipboard:copy');
                    }
                }},
                {text: '<i class="fa fa-clipboard"></i> '+resources.clipboard.paste, action: function (e) {
                    e.preventDefault();
                    var target = $(e.target).closest('.dropdown-context').data('contextTarget'), $target = $(target);
                    if (target) {
                        var $nodeDetailRow = $target.closest('.clipboardTargetRow');
                        if ($nodeDetailRow.length) {
                            $nodeDetailRow.trigger('clipboard:paste');
                        }
                        else {
                            $target.trigger('clipboard:paste');
                        }

                    }
                }}
            ]);
        }

    });