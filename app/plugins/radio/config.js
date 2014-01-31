/*global define:false*/
define(['text!plugins/radio/template.html', 'plugins/radio/model', 'text!plugins/radio/setupTemplate.html'],
    function (radioPluginTemplate, radioPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'radioPlugin',
            ModelType : radioPluginModel,
            modelData : {},
            template : radioPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });