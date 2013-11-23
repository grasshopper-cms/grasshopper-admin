/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (templateHtml, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        templateHtml : templateHtml,
        rivetConfig : {
            scope : '#alertBoxPartial',
            prefix : 'alertbox'
        }
    };
});