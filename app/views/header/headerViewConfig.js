/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel', 'masseuse'],
    function (template, HeaderViewModel, masseuse) {
        'use strict';

        var ViewContext = masseuse.ViewContext;

        return {
            name : 'headerView',
            modelData : {},
            ModelType : HeaderViewModel,
            appendTo : '#header',
            wrapper : false,
            template : template,
            events : {},
            bindings : [],
            rivetConfig : 'auto'
        };
    });