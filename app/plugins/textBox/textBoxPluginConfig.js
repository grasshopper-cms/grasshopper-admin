/*global define:false*/
define(['text!plugins/textBox/textBoxPlugin.html', 'plugins/textBox/textBoxPluginModel'],
    function (textBoxPluginTemplate, textBoxPluginModel) {
        'use strict';

        return {
            name : 'textBoxPlugin',
            ModelType : textBoxPluginModel,
            modelData : {},
            el : '#stage',
            templateHtml : textBoxPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });