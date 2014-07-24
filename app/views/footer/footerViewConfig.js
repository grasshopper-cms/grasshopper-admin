/*global define:false*/
define(['text!views/footer/footerView.html', 'footerViewModel'],
    function (template, FooterViewModel) {
        'use strict';

        return {
            name : 'footerView',
            modelData : {},
            ModelType : FooterViewModel,
            appendTo : '#footer',
            wrapper : false,
            template : template,
            events : {},
            listeners : []
        };
    });