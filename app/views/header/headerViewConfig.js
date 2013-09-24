/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel', 'app'], function (templateHtml, HeaderViewModel, app) {
    'use strict';

    return {
        name : 'headerView',
        modelData : {},
        ModelType : HeaderViewModel,
        el : '#header',
        templateHtml : templateHtml,
        events : {
            'click #logOutButton' : 'logout',
            'click #logInButton' : 'login'
        }
    };
});