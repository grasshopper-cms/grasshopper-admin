/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (templateHtml, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        templateHtml : templateHtml,
        appendView : true,
        rivetConfig : 'auto',
        events : {
            'click #closeAlertBox' : 'closeAlertBox'
        },
        bindings : [
            ['channels.views', 'hideAlertBoxes', 'closeAlertBox']
        ]
    };
});