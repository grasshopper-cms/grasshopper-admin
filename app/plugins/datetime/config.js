/*global define:false*/
define(['text!plugins/datetime/template.html', 'plugins/datetime/model', 'text!plugins/datetime/setupTemplate.html'],
    function (datetimePluginTemplate, datetimePluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'datetimePlugin',
            ModelType : datetimePluginModel,
            modelData : {},
            template : datetimePluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });