/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel', 'viewContext'], function (templateHtml, HeaderViewModel, ViewContext) {
    'use strict';

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
        prependView : false,
        bindings : [],
        rivetConfig : 'auto'
    };
});