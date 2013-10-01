/*global define:false*/
define(['text!views/usersIndex/usersIndexView.html', 'usersIndexViewModel'], function (templateHtml, UsersIndexViewModel) {
    'use strict';

    return {
        name : 'usersIndexView',
        ModelType : UsersIndexViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            // TODO: is it possible to hardcode this?
            'click a.pagination_pages' : 'goToPage'
        }
    };

});
