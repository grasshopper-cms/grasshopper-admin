/*global define:false*/
define(['text!plugins/slug/template.html', 'plugins/slug/model', 'text!plugins/slug/setupTemplate.html'],
    function (slugPluginTemplate, slugPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'slugPlugin',
            ModelType : slugPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : true,
                label : '',
                type : 'slug',
                defaultValueType : 'text',
                dataComplexity : 'simple',
                required : false,
                validation : false,
                value : ''
            },
            template : slugPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });