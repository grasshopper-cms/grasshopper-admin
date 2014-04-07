/*global define:false*/
define(['text!plugins/boolean/template.html', 'plugins/boolean/model', 'text!plugins/boolean/setupTemplate.html'],
    function (booleanPluginTemplate, booleanPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'booleanPlugin',
            ModelType : booleanPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'boolean',
                defaultValueType : 'text',
                dataType : 'boolean',
                validation : [],
                value : ''
            },
            template : booleanPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });