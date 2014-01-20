/*global define:false*/
define(['text!plugins/textBox/textBoxPlugin.html', 'plugins/textBox/textBoxPluginModel'],
    function (textBoxPluginTemplate, textBoxPluginModel) {
        'use strict';

        return {
            name : 'textBoxPlugin',
            ModelType : textBoxPluginModel,
            modelData : {},
            template : textBoxPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });