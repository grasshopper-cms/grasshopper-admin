/*global define:false*/
define(['text!plugins/datetime/template.html', 'plugins/datetime/model', 'text!plugins/datetime/setupTemplate.html'],
    function (datetimePluginTemplate, datetimePluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'datetimePlugin',
            ModelType : datetimePluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'datetime',
                dataType : 'date',
                required : false,
                validation : false,
                value : ''
            },
            template : datetimePluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });