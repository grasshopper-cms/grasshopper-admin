/*global define:false*/
define(['text!views/usersIndex/usersIndexView.html', 'usersIndexViewModel'], function (templateHtml, UsersIndexViewModel) {
    'use strict';

    return {
        name : 'usersIndexView',
        modelData : {},
        ModelType : UsersIndexViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'change #limitDropdown' : 'changeLimit'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto'
    };

});