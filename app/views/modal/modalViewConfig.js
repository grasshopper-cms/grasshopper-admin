/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel', 'formatters', 'modalViewBinders'],
    function (template, modalViewModel, appFormatters, binders) {

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
            binders : [binders],
            instaUpdate : true
        }
    };
});