/*global define:false*/
define(['text!views/clipboard/clipboardView.html', 'clipboardViewModel', 'formatters'],
    function (template, ClipboardViewModel, formatters) {
        'use strict';

        return {
            name : 'clipboardView',
            modelData : {},
            ModelType : ClipboardViewModel,
            appendTo : '#clipboardBlock',
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
            rivetsConfig: {
                formatters : [formatters]
            },
            transitions : 'none'
        };
    });