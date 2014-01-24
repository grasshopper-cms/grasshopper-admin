/*global define:false*/
define(['text!plugins/readonly/template.html', 'plugins/readonly/model'],
    function (readonlyPluginTemplate, readonlyPluginModel) {
        'use strict';

        return {
            name : 'readonlyPlugin',
            ModelType : readonlyPluginModel,
            modelData : {},
            wrapper: false,
            template : readonlyPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });