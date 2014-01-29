/*global define:false*/
define(['text!plugins/password/template.html', 'plugins/password/model', 'text!plugins/password/setupTemplate.html'],
    function (passwordPluginTemplate, passwordPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'passwordPlugin',
            ModelType : passwordPluginModel,
            modelData : {},
            template : passwordPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });