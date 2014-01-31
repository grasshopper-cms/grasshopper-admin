/*global define:false*/
define(['text!plugins/checkbox/template.html', 'plugins/checkbox/model', 'text!plugins/checkbox/setupTemplate.html'],
    function (checkboxPluginTemplate, checkboxPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'checkboxPlugin',
            ModelType : checkboxPluginModel,
            modelData : {},
            template : checkboxPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });