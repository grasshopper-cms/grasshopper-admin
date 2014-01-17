/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (template, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        ModelType : alertBoxViewModel,
        el : '#alertBox',
        template : template,
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