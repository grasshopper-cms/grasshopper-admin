/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel', 'masseuse'],
    function (templateHtml, HeaderViewModel, masseuse) {
        'use strict';

        var ViewContext = masseuse.ViewContext;

        return {
            name : 'headerView',
            modelData : {
                userModel : ViewContext('app.user')
            },
            ModelType : HeaderViewModel,
            el : '#header',
            templateHtml : templateHtml,
            events : {},
            appendView : true,
            bindings : [],
            rivetConfig : 'auto'
        };
    });