/*global define:false*/
define(['text!plugins/date/template.html', 'plugins/date/model', 'text!plugins/date/setupTemplate.html'],
    function (datePluginTemplate, datePluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'datePlugin',
            ModelType : datePluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'date',
                required : false,
                validation : false,
                value : ''
            },
            template : datePluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : []
        };
    });