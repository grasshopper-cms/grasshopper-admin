/*global define:false*/
define(['text!plugins/textbox/template.html', 'plugins/textbox/model'],
    function (textBoxPluginTemplate, textBoxPluginModel) {
        'use strict';

        return {
            name : 'textBoxPlugin',
            ModelType : textBoxPluginModel,
            modelData : {
                something: 'something'
            },
            template : textBoxPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            bindings : [],
            mastheadButtons : []
        };
    });