/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel'], function (templateHtml, HeaderViewModel) {
    'use strict';

    return {
        name : 'headerView',
        modelData : {name: 'Menu', url: 'home'},
        ModelType : HeaderViewModel,
        el : '#header',
        templateHtml : templateHtml,
        events : {
            'click #logOutButton' : 'logout',
            'click #logInButton' : 'login',
            'click #displayUsersButton' : 'displayUsers'
        },
        bindings : [
            ['app.user', 'change', 'setUser']
        ]
    };
});