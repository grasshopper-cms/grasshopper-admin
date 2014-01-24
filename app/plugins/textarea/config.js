/*global define:false*/
define(['text!plugins/textArea/template.html', 'plugins/textArea/model'],
    function (textAreaPluginTemplate, textAreaPluginModel) {
        'use strict';

        return {
            name : 'textAreaPlugin',
            ModelType : textAreaPluginModel,
            modelData : {},
            wrapper: false,
            template : textAreaPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });