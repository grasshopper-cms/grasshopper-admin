/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel'], function (templateHtml, mastheadViewModel) {
    'use strict';

    return {
        name : 'mastheadView',
        permanentView : true,
        modelData : {
                        title: '<small><a href="#">cms</a> / <a href="#">folder</a> /</small> Pages',
                        icon: 'icon-file',
                        description: '23 content items. 45 files.'
                    },
        modelType : mastheadViewModel,
        el : '#masthead',
        templateHtml : templateHtml,
        events : {},
        appendView : true,
        bindings : [],
        rivetConfig : 'auto'
    };
});