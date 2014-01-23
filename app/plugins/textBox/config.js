/*global define:false*/
define(['text!plugins/textbox/template.html', 'plugins/textbox/model'],
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
            mastheadButtons : []
        };
    });