/*global define:false*/
define(['text!plugins/dropdown/template.html', 'plugins/dropdown/model'],
    function (dropdownPluginTemplate, dropdownPluginModel) {
        'use strict';

        return {
            name : 'dropdownPlugin',
            ModelType : dropdownPluginModel,
            modelData : {},
            template : dropdownPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });