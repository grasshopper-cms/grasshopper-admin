/*global define:false*/
define(['text!plugins/datePicker/datePickerPlugin.html', 'datePickerPluginModel'],
    function (datePickerPluginTemplate, datePickerPluginModel) {
        'use strict';

        return {
            name : 'datePickerPlugin',
            ModelType : datePickerPluginModel,
            modelData : {},
            el : '#stage',
            templateHtml : datePickerPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });