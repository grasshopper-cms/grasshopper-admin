/*global define:false*/
define(['text!views/alertBox/alertBoxView.html', 'alertBoxViewModel'], function (template, alertBoxViewModel) {
    'use strict';

    return {
        name : 'alertBoxView',
        ModelType : alertBoxViewModel,
        appendTo : '#alertBox',
        wrapper : false,
        template : template,
        rivetConfig : 'auto',
        events : {
            'click #closeAlertBox' : 'closeAlertBox'
        },
        listeners : [
            ['channels.views', 'hideAlertBoxes', 'closeAlertBox']
        ]
    };
});