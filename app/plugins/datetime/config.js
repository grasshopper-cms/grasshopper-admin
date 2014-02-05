/*global define:false*/
define(['text!plugins/datetime/template.html', 'plugins/datetime/model', 'text!plugins/datetime/setupTemplate.html'],
    function (datetimePluginTemplate, datetimePluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'datetimePlugin',
            ModelType : datetimePluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'datetime',
                required : false,
                validation : false,
                value : ''
            },
            template : datetimePluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });