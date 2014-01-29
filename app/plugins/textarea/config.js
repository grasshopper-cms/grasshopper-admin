/*global define:false*/
define(['text!plugins/textArea/template.html', 'plugins/textArea/model', 'text!plugins/textArea/setupTemplate.html'],
    function (textAreaPluginTemplate, textAreaPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'textAreaPlugin',
            ModelType : textAreaPluginModel,
            modelData : {},
            wrapper: false,
            template : textAreaPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });