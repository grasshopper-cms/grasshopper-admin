/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel'],
    function (template, HeaderViewModel) {
        'use strict';

        return {
            name : 'headerView',
            modelData : {},
            ModelType : HeaderViewModel,
            appendTo : '#header',
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
            rivetConfig : 'auto'
        };
    });