/*global define:false*/
define(['text!plugins/textArea/textAreaPlugin.html', 'plugins/textArea/textAreaPluginModel'],
    function (textAreaPluginTemplate, textAreaPluginModel) {
        'use strict';

        return {
            name : 'textAreaPlugin',
            ModelType : textAreaPluginModel,
            modelData : {},
            el : '',
            template : textAreaPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });