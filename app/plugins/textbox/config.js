/*global define:false*/
define(['text!plugins/textbox/template.html', 'plugins/textbox/model', 'text!plugins/textbox/setupTemplate.html'],
    function (textBoxPluginTemplate, textBoxPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'textBoxPlugin',
            ModelType : textBoxPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'textbox',
                defaultValueType : 'text',
                dataType : 'string',
                required : false,
                validation : [],
                value : ''
            },
            template : textBoxPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });