/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (templateHtml, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        templateHtml : templateHtml,
        appendView: true,
        rivetConfig : {
            scope : '#alertBoxPartial',
            prefix : 'alertbox'
        },
        events : {
            'click #closeAlertBox' : 'closeAlertBox'
        }
    };
});