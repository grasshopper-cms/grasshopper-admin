/*global define:false*/
define(['text!plugins/checkbox/template.html', 'plugins/checkbox/model', 'text!plugins/checkbox/setupTemplate.html'],
    function (checkboxPluginTemplate, checkboxPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'checkboxPlugin',
            ModelType : checkboxPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'checkbox',
                required : false,
                validation : false,
                value : ''
            },
            template : checkboxPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });