/*global define:false*/
define(['text!plugins/readonly/readonlyPlugin.html', 'plugins/readonly/readonlyPluginModel'],
    function (readonlyPluginTemplate, readonlyPluginModel) {
        'use strict';

        return {
            name : 'readonlyPlugin',
            ModelType : readonlyPluginModel,
            modelData : {},
            el : '#stage',
            template : readonlyPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });