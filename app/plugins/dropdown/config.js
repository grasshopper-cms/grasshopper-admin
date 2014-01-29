/*global define:false*/
define(['text!plugins/dropdown/template.html', 'plugins/dropdown/model', 'text!plugins/dropdown/setupTemplate.html'],
    function (dropdownPluginTemplate, dropdownPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'dropdownPlugin',
            ModelType : dropdownPluginModel,
            modelData : {},
            wrapper: false,
            template : dropdownPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });