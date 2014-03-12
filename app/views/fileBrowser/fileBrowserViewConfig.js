/*global define:false*/
define(['text!views/fileBrowser/fileBrowserView.html', 'fileBrowserViewModel'],
    function (template, FileBrowserViewModel) {
        'use strict';

        return {
            name : 'fileBrowserView',
            modelData : {},
            ModelType : FileBrowserViewModel,
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {},
            listeners : []
        };
    });