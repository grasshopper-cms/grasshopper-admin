/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (templateHtml, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        modelData : {loginError : ''},
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        templateHtml : templateHtml
    };
});