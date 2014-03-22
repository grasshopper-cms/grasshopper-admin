/*global define:false*/
define(['text!views/nodeIndex/nodeIndexView.html', 'resources', 'nodeIndexViewModel'],
    function (template, resources, nodeIndexViewModel) {
        'use strict';

        return {
            name : 'nodeIndexView',
            ModelType : nodeIndexViewModel,
            template : template,
            wrapper : false,
            listeners : [
                ['channels.views', 'mastheadDropdownClicked', 'updateCurrentNode']
            ],
            events : {},
            appendTo : '#contentBrowseTable',
            permissions : ['admin', 'reader', 'editor']
        };
    });