/*global define:false*/
define(['text!plugins/dropdown/dropdownPlugin.html', 'plugins/dropdown/dropdownPluginModel'],
    function (dropdownPluginTemplate, dropdownPluginModel) {
        'use strict';

        return {
            name : 'dropdownPlugin',
            ModelType : dropdownPluginModel,
            modelData : {},
            el : '',
            template : dropdownPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });