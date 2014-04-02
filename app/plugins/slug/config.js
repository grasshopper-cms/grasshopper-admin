/*global define:false*/
define(['text!plugins/slug/template.html', 'plugins/slug/model', 'text!plugins/slug/setupTemplate.html',
    'plugins/slug/formatters'],
    function (slugPluginTemplate, slugPluginModel, setupTemplate, formatters) {
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
                dataType : 'string',
                required : false,
                validation : [],
                value : ''
            },
            template : slugPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [
                ['channels.views', 'contentFieldsChange', 'calculateSlug']
            ],
            mastheadButtons : [],
            rivetsConfig : {
                formatters : [formatters]
            }
        };
    });