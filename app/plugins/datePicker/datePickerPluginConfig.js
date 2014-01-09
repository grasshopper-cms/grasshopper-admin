/*global define:false*/
define(['text!plugins/datePicker/datePickerPlugin.html', 'plugins/datePicker/datePickerPluginModel'],
    function (datePickerPluginTemplate, datePickerPluginModel) {
        'use strict';

        return {
            name : 'datePickerPlugin',
            ModelType : datePickerPluginModel,
            modelData : {},
            el : '',
            templateHtml : datePickerPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });