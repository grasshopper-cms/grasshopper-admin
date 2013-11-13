/*global define:false*/
define(['text!views/masthead/mastheadView.html', 'mastheadViewModel'], function (templateHtml, mastheadViewModel) {
    'use strict';

    return {
        name : 'mastheadView',
        modelData : {
                        title: 'cms/folder/Pages',
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