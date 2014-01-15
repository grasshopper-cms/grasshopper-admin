/*global define:false*/
define(['text!views/addContent/addContentView.html', 'addContentViewModel', 'pluginBinder'],
    function (addContentTemplate, addContentViewModel, pluginBinder) {
        'use strict';

        return {
            name : 'addContentView',
            ModelType : addContentViewModel,
            modelData : {},
            el : '#stage',
            templateHtml : addContentTemplate,
            events : {
                'blur .fieldtype' : 'consoleLogIt'
            },
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetBinders : [pluginBinder]
        };
    });