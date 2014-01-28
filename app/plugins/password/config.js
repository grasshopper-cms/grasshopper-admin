/*global define:false*/
define(['text!plugins/password/template.html', 'plugins/password/model'],
    function (passwordPluginTemplate, passwordPluginModel) {
        'use strict';

        return {
            name : 'passwordPlugin',
            ModelType : passwordPluginModel,
            modelData : {},
            template : passwordPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });