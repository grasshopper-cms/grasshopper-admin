/*global define:false*/
define(['text!views/usersIndex/usersIndexView.html', 'usersIndexViewModel'], function (templateHtml, UsersIndexViewModel) {
    'use strict';

    return {
        name : 'usersIndexView',
        ModelType : UsersIndexViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'change #limitDropdown' : 'changeLimit'
        },
        rivetConfig : {
            scope : '#usersIndex',
            prefix : 'usersindex',
            instaUpdateRivets : true
        }
    };

});
