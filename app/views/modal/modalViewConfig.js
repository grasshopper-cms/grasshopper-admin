/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel', 'formatters'],
    function (template, modalViewModel, appFormatters) {

    'use strict';

    return {
        name : 'modalView',
        ModelType : modalViewModel,
        appendTo : '#modal',
        wrapper : false,
        template : template,
        events : {
            'change #uploadFileInput' : 'handleFileSelect'
        },
        rivetsConfig : {
            formatters : [appFormatters],
            instaUpdate : true
        }
    };
});