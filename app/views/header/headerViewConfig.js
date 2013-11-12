/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel'], function (templateHtml, HeaderViewModel) {
    'use strict';

    return {
        name : 'headerView',
        permanentView : true,
        modelData : {
                        name: 'Menu',
                        url: 'home'
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