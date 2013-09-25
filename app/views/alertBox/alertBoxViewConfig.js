/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (templateHtml, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        modelData : {error : ''},
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        templateHtml : templateHtml
    };
});