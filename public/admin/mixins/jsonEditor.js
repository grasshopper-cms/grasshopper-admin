define(['constants', 'JSONEditor', 'underscore'], function (constants, JSONEditor, _) {
    'use strict';

    return {
        init: init
    };

    function init (el, context, options) {
        var editor;
        _.extend(options ? options : {}, constants.jsoneditor);
        editor = new JSONEditor(el, options);
        editor.set(options.json);
        context.jsonEditor = editor;
    }

});
