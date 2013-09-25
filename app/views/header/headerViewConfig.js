/*global define:false*/
define(['text!views/header/headerView.html', 'headerViewModel'], function (templateHtml, HeaderViewModel) {
    'use strict';

    return {
        name : 'headerView',
        modelData : {admin:false},
        ModelType : HeaderViewModel,
        el : '#header',
        templateHtml : templateHtml,
        events : {
            'click #logOutButton' : 'logout',
            'click #logInButton' : 'login',
            'click #myProfileButton' : 'showMyProfile'
        }
    };
});