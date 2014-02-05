/*global define:false*/
define(['text!plugins/textArea/template.html', 'plugins/textArea/model', 'text!plugins/textArea/setupTemplate.html'],
    function (textAreaPluginTemplate, textAreaPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'textAreaPlugin',
            ModelType : textAreaPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'textarea',
                required : false,
                validation : false,
                value : ''
            },
            wrapper: false,
            template : textAreaPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : []
        };
    });