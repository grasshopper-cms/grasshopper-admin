/*global define:false*/
define(['text!plugins/readonly/template.html', 'plugins/readonly/model', 'text!plugins/readonly/setupTemplate.html'],
    function (readonlyPluginTemplate, readonlyPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'readonlyPlugin',
            ModelType : readonlyPluginModel,
            modelData : {},
            wrapper: false,
            template : readonlyPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : []
        };
    });