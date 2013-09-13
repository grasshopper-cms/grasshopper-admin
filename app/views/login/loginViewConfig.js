/*global define:false*/
define(['text!views/login/loginView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'loginView',
        modelData : {name : 'Joe'},
        el : '#stage',
        templateHtml : templateHtml
    };
});